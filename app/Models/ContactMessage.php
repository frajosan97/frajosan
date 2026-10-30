<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'organization',
        'catalog_type',
        'catalog_id',
        'catalog_name',
        'message',
        'ip_address',
        'user_agent',
        'referrer',
        'status',
        'read_at',
        'replied_at',
        'replied_by',
        'internal_notes',
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'replied_at' => 'datetime',
    ];

    /* ─── Relations ─── */

    public function repliedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'replied_by');
    }

    /**
     * Optional dynamic relation back to the product/service.
     * Kept simple here; if you want polymorphism, switch catalog_type/id
     * to a morphTo() with `catalogable_type` + `catalogable_id` columns.
     */
    public function catalog()
    {
        if (!$this->catalog_type || !$this->catalog_id) {
            return null;
        }

        return $this->catalog_type === 'product'
            ? Product::find($this->catalog_id)
            : Service::find($this->catalog_id);
    }

    /* ─── Scopes ─── */

    public function scopeNew($q)
    {
        return $q->where('status', 'new');
    }

    public function scopeRecent($q, int $days = 30)
    {
        return $q->where('created_at', '>=', now()->subDays($days));
    }

    /* ─── Helpers ─── */

    public function markAsRead(): void
    {
        if ($this->read_at === null) {
            $this->forceFill([
                'read_at' => now(),
                'status' => $this->status === 'new' ? 'read' : $this->status,
            ])->save();
        }
    }

    public function markAsReplied(?int $userId = null): void
    {
        $this->forceFill([
            'replied_at' => now(),
            'replied_by' => $userId ?? auth()->id(),
            'status' => 'replied',
        ])->save();
    }
}
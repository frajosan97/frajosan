<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimony extends Model
{
    use HasFactory;

    /**
     * Note: the migration creates the table `testimonies`,
     * so Eloquent's pluralization resolves correctly (Testimony -> testimonies).
     * Overriding explicitly for clarity/safety.
     */
    protected $table = 'testimonies';

    protected $fillable = [
        'name',
        'role',
        'image',
        'quote',
        'rating',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];

    // ---------------------------------------------------------------------
    // Scopes
    // ---------------------------------------------------------------------

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderByDesc('id');
    }

    public function scopeMinRating(Builder $query, int $rating): Builder
    {
        return $query->where('rating', '>=', $rating);
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    /**
     * Render the rating as a repeated star string (e.g. "★★★★★").
     * Useful in Blade: {{ $testimony->stars }}
     */
    public function getStarsAttribute(): string
    {
        $rating = max(0, min(5, (int) $this->rating));

        return str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
    }

    // In Service, Testimony, Brand models:
    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (blank($term)) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($term) {
            $like = '%' . $term . '%';

            $q->where('name', 'like', $like)
                ->orWhere('role', 'like', $like)
                ->orWhere('quote', 'like', $like);
        });
    }
}
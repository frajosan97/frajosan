<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'icon',
        'title',
        'slug',
        'tagline',
        'body',
        'image',
        'type',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Constants for service types.
     */
    public const TYPE_CORE = 'core';
    public const TYPE_ADDON = 'addon';

    // ---------------------------------------------------------------------
    // Scopes
    // ---------------------------------------------------------------------

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('is_active', false);
    }

    public function scopeCore(Builder $query): Builder
    {
        return $query->where('type', self::TYPE_CORE);
    }

    public function scopeAddons(Builder $query): Builder
    {
        return $query->where('type', self::TYPE_ADDON);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    // ---------------------------------------------------------------------
    // Route model binding: resolve by slug instead of id
    // ---------------------------------------------------------------------

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    public function isCore(): bool
    {
        return $this->type === self::TYPE_CORE;
    }

    public function isAddon(): bool
    {
        return $this->type === self::TYPE_ADDON;
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (blank($term)) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($term) {
            $like = '%' . $term . '%';

            $q->where('title', 'like', $like)
                ->orWhere('tagline', 'like', $like)
                ->orWhere('slug', 'like', $like);
        });
    }
}
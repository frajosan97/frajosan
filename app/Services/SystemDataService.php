<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Service;
use App\Models\Testimony;

class SystemDataService
{
    public function get(): array
    {
        return [
            'products' => Product::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(['icon', 'title', 'slug', 'tagline', 'image'])
                ->toArray(),

            'services' => Service::query()
                ->orderBy('title')
                ->get(['icon', 'title', 'slug', 'tagline', 'image', 'type', 'sort_order', 'is_active',])
                ->toArray(),

            'brands' => Brand::query()
                ->get(['name', 'subtitle', 'logo', 'url', 'sort_order', 'is_active'])
                ->toArray(),

            'testimonies' => Testimony::query()
                ->get(['name', 'role', 'image', 'quote', 'rating', 'sort_order', 'is_active'])
                ->toArray(),
        ];
    }
}
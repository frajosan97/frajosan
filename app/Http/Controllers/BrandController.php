<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::query()
            ->search($request->input('search'))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('brands/index', [
            'brands' => $brands,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('brands/create');
    }

    public function store(BrandRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('brands', 'public');
            $validated['logo'] = Storage::url($path);
        } else {
            $validated['logo'] = null;
        }

        Brand::create($validated);

        return redirect()
            ->route('admin.brands.index')
            ->with('success', 'Brand created.');
    }

    public function show(Brand $brand)
    {
        return Inertia::render('brands/show', [
            'brand' => $brand,
        ]);
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('brands/edit', [
            'brand' => $brand,
        ]);
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $validated = $request->validated();

        if ($request->hasFile('logo')) {
            // New file uploaded — delete old, store new.
            $this->deleteLogoFile($brand);
            $path = $request->file('logo')->store('brands', 'public');
            $validated['logo'] = Storage::url($path);
        } elseif (array_key_exists('logo', $validated) && $validated['logo'] === null) {
            // User explicitly removed the logo.
            $this->deleteLogoFile($brand);
            $validated['logo'] = null;
        } else {
            // Untouched — don't overwrite the existing URL.
            unset($validated['logo']);
        }

        $brand->update($validated);

        return redirect()
            ->route('admin.brands.index')
            ->with('success', 'Brand updated.');
    }

    public function destroy(Brand $brand)
    {
        $this->deleteLogoFile($brand);
        $brand->delete();

        return redirect()
            ->route('admin.brands.index')
            ->with('success', 'Brand deleted.');
    }

    /**
     * Safely delete the brand's stored logo file.
     */
    private function deleteLogoFile(Brand $brand): void
    {
        if (!$brand->logo) {
            return;
        }

        if (!str_starts_with($brand->logo, '/storage/brands/')) {
            return;
        }

        $relative = str_replace('/storage/', '', $brand->logo);
        Storage::disk('public')->delete($relative);
    }
}
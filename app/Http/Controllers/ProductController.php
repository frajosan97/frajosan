<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->search($request->input('search'))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create');
    }

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        if (!empty($validated['body'])) {
            $validated['body'] = Purifier::clean($validated['body']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            $validated['image'] = null;
        }

        Product::create($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created.');
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        if (!empty($validated['body'])) {
            $validated['body'] = Purifier::clean($validated['body']);
        }

        if ($request->hasFile('image')) {
            // New file uploaded — delete old, store new.
            $this->deleteImageFile($product);
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        } elseif (array_key_exists('image', $validated) && $validated['image'] === null) {
            // User explicitly removed the image via the uploader's ✕ button.
            $this->deleteImageFile($product);
            $validated['image'] = null;
        } else {
            // Untouched — don't overwrite the existing URL.
            unset($validated['image']);
        }

        $product->update($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $this->deleteImageFile($product);
        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product deleted.');
    }

    /**
     * Safely delete the product's stored image file, if it lives
     * on our public disk under the products/ directory.
     */
    private function deleteImageFile(Product $product): void
    {
        if (!$product->image) {
            return;
        }

        // Only delete files we own. Skip external URLs or seeders.
        if (!str_starts_with($product->image, '/storage/products/')) {
            return;
        }

        $relative = str_replace('/storage/', '', $product->image);
        Storage::disk('public')->delete($relative);
    }

    public function publicShow(Product $product)
    {
        abort_unless($product->is_active, 404);

        $related = Product::query()
            ->where('is_active', true)
            ->where('id', '!=', $product->id)
            ->ordered()
            ->limit(3)
            ->get();

        return Inertia::render('products/public-show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
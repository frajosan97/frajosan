<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestimonyRequest;
use App\Models\Testimony;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonyController extends Controller
{
    public function index(Request $request)
    {
        $testimonies = Testimony::query()
            ->search($request->input('search'))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('testimonies/index', [
            'testimonies' => $testimonies,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('testimonies/create');
    }

    public function store(TestimonyRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('testimonies', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            $validated['image'] = null;
        }

        Testimony::create($validated);

        return redirect()
            ->route('admin.testimonies.index')
            ->with('success', 'Testimony created.');
    }

    public function show(Testimony $testimony)
    {
        return Inertia::render('testimonies/show', [
            'testimony' => $testimony,
        ]);
    }

    public function edit(Testimony $testimony)
    {
        return Inertia::render('testimonies/edit', [
            'testimony' => $testimony,
        ]);
    }

    public function update(TestimonyRequest $request, Testimony $testimony)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            // New file uploaded — delete old, store new.
            $this->deleteImageFile($testimony);
            $path = $request->file('image')->store('testimonies', 'public');
            $validated['image'] = Storage::url($path);
        } elseif (array_key_exists('image', $validated) && $validated['image'] === null) {
            // User explicitly removed the image.
            $this->deleteImageFile($testimony);
            $validated['image'] = null;
        } else {
            // Untouched — don't overwrite the existing URL.
            unset($validated['image']);
        }

        $testimony->update($validated);

        return redirect()
            ->route('admin.testimonies.index')
            ->with('success', 'Testimony updated.');
    }

    public function destroy(Testimony $testimony)
    {
        $this->deleteImageFile($testimony);
        $testimony->delete();

        return redirect()
            ->route('admin.testimonies.index')
            ->with('success', 'Testimony deleted.');
    }

    /**
     * Safely delete the testimony's stored image file.
     */
    private function deleteImageFile(Testimony $testimony): void
    {
        if (!$testimony->image) {
            return;
        }

        if (!str_starts_with($testimony->image, '/storage/testimonies/')) {
            return;
        }

        $relative = str_replace('/storage/', '', $testimony->image);
        Storage::disk('public')->delete($relative);
    }
}
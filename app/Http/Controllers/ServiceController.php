<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = Service::query()
            ->search($request->input('search'))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('services/index', [
            'services' => $services,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('services/create', [
            'types' => [
                Service::TYPE_CORE,
                Service::TYPE_ADDON,
            ],
        ]);
    }

    public function store(ServiceRequest $request)
    {
        $validated = $request->validated();

        if (!empty($validated['body'])) {
            $validated['body'] = Purifier::clean($validated['body']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('services', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            $validated['image'] = null;
        }

        Service::create($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service created.');
    }

    public function show(Service $service)
    {
        return Inertia::render('services/show', [
            'service' => $service,
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('services/edit', [
            'service' => $service,
            'types' => [
                Service::TYPE_CORE,
                Service::TYPE_ADDON,
            ],
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $validated = $request->validated();

        if (!empty($validated['body'])) {
            $validated['body'] = Purifier::clean($validated['body']);
        }

        if ($request->hasFile('image')) {
            // New file uploaded — delete old, store new.
            $this->deleteImageFile($service);
            $path = $request->file('image')->store('services', 'public');
            $validated['image'] = Storage::url($path);
        } elseif (array_key_exists('image', $validated) && $validated['image'] === null) {
            // User explicitly removed the image.
            $this->deleteImageFile($service);
            $validated['image'] = null;
        } else {
            // Untouched — don't overwrite the existing URL.
            unset($validated['image']);
        }

        $service->update($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $this->deleteImageFile($service);
        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service deleted.');
    }

    /**
     * Safely delete the service's stored image file, if it lives
     * on our public disk under the services/ directory.
     */
    private function deleteImageFile(Service $service): void
    {
        if (!$service->image) {
            return;
        }

        // Only delete files we own. Skip external URLs or seeders.
        if (!str_starts_with($service->image, '/storage/services/')) {
            return;
        }

        $relative = str_replace('/storage/', '', $service->image);
        Storage::disk('public')->delete($relative);
    }

    public function publicShow(Service $service)
    {
        abort_unless($service->is_active, 404);

        // Suggest related services of the same type.
        $related = Service::query()
            ->where('is_active', true)
            ->where('type', $service->type)
            ->where('id', '!=', $service->id)
            ->ordered()
            ->limit(3)
            ->get();

        return Inertia::render('services/public-show', [
            'service' => $service,
            'related' => $related,
        ]);
    }
}
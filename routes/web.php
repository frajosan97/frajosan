<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonyController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.store');

Route::get('/products/{product:slug}', [ProductController::class, 'publicShow'])
    ->name('products.public');

Route::get('/services/{service:slug}', [ServiceController::class, 'publicShow'])
    ->name('services.public');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::resources([
            'products' => ProductController::class,
            'services' => ServiceController::class,
            'brands' => BrandController::class,
            'testimonies' => TestimonyController::class,
        ]);
    });

require __DIR__ . '/settings.php';

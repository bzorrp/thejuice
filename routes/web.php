<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\JuiceController;
use App\Http\Controllers\ProfileController;
use App\Models\Juice;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'juices' => Juice::all(),
    ]);
})->name('home');

Route::redirect('/dashboard', '/')->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/cart', [CartController::class, 'show'])->name('cart.show');
    Route::post('/cart/add/{juice}', [CartController::class, 'addToCart'])->name('cart.add');
    Route::post('/cart/remove/{juice}', [CartController::class, 'removeFromCart'])->name('cart.remove');
});


Route::get('/juice/{juice}', [JuiceController::class, 'show'])->name('juice.show');


require __DIR__.'/auth.php';

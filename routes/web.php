<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\FundraiserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PopupStoreController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [StaticPageController::class, 'index'])->name('home');
Route::get('about', [StaticPageController::class, 'about'])->name('about');

Route::middleware('auth')->group(function () {
    // Disable auth middleware to allow organizer to login directly from the fundraiser creation form
    Route::get('fundraiser/create', [FundraiserController::class, 'create'])->withoutMiddleware('auth')->name('create.fundraiser');
    Route::get('fundraiser/{fundraiser:uuid}', [FundraiserController::class, 'show'])->name('show.fundraiser');
    Route::delete('fundraiser/{fundraiser:uuid}', [FundraiserController::class, 'destroy'])->name('cancel.fundraiser');
    Route::patch('fundraiser/{fundraiser:uuid}', [FundraiserController::class, 'update'])->name('update.fundraiser');
    Route::post('fundraisers', [FundraiserController::class, 'store'])->name('store.fundraiser');
    Route::get('fundraisers', [FundraiserController::class, 'index'])->name('fundraisers');

    // Disable auth middleware to allow participant to login directly from the join fundraiser form
    Route::get('fundraiser/{fundraiser:uuid}/join', [PopupStoreController::class, 'create'])->withoutMiddleware('auth')->name('join.fundraiser');
    Route::post('fundraiser/{fundraiser:uuid}/join', [PopupStoreController::class, 'store'])->name('create.store');
    Route::get('stores', [PopupStoreController::class, 'index'])->name('stores');
});

Route::get('s/{store:uuid}', [PopupStoreController::class, 'show'])->name('popup.store');
Route::get('s/{store:uuid}/checkout', [CheckoutController::class, 'show'])->name('show.checkout');
Route::post('s/{store:uuid}/checkout', [CheckoutController::class, 'store'])->name('store.checkout');
Route::post('s/{store:uuid}/order', [OrderController::class, 'store'])->name('submit.order');
Route::get('s/{store:uuid}/order/{order:uuid}', [OrderController::class, 'show'])->name('show.order');

Route::post('s/{store:uuid}/cart', [CartController::class, 'store'])->name('add.to.cart');
Route::patch('s/{store:uuid}/cart', [CartController::class, 'delete'])->name('remove.from.cart');

require __DIR__.'/auth.php';

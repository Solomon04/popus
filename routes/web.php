<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

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

Route::get('/', function (){
    $stores = \App\Models\Store::with(['user', 'fundraiser'])->inRandomOrder()->take(6)->get();
    return Inertia::render('Home', [
        'stores' => $stores
    ]);
})->name('home');
Route::inertia('/fundraiser', 'Organizer/FundraiserDetail');
Route::inertia('/dashboard', 'Organizer/Dashboard');
Route::inertia('/summary', 'Popup/Summary');

Route::get('s/{store:uuid}', [\App\Http\Controllers\PopupStoreController::class, 'show'])->name('popup.store');
Route::get('s/{store:uuid}/checkout', [CheckoutController::class, 'show'])->name('show.checkout');
Route::post('s/{store:uuid}/checkout', [CheckoutController::class, 'store'])->name('store.checkout');
Route::post('s/{store:uuid}/order', [OrderController::class, 'store'])->name('submit.order');
Route::get('s/{store:uuid}/order/{order:uuid}', [OrderController::class, 'show'])->name('show.order');

Route::post('s/{store:uuid}/cart', [CartController::class, 'store'])->name('add.to.cart');
Route::patch('s/{store:uuid}/cart', [CartController::class, 'delete'])->name('remove.from.cart');

//Route::post('checkout', [OrderController::class, 'store'])->name('checkout');
Route::get('get-started', function (){
    return Inertia::render('GetStarted');
})->name('get.started');

Route::middleware(['verified', 'auth'])->group(function (){

});

require __DIR__ . '/auth.php';

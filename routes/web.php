<?php

use App\Http\Controllers\OrderController;
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

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

// Store model: user_id,
// Fundraiser model: user_id,
// Product:
// Customer:

Route::get('store', function () {
    $products = \App\Models\Product::active()->take(6)->get();
    return Inertia::render('Popup/Store', [
        'products' => $products
    ]);
})->name('popup.store');

Route::get('/', function (){
    return Inertia::render('Home', [
        'stores' => null
    ]);
})->name('home');
Route::inertia('/fundraiser', 'Organizer/FundraiserDetail');
Route::inertia('/dashboard', 'Organizer/Dashboard');
Route::inertia('/checkout', 'Popup/Checkout');
Route::inertia('/summary', 'Popup/Summary');

Route::post('checkout', [OrderController::class, 'store'])->name('checkout');
Route::get('get-started', function (){
    return Inertia::render('GetStarted');
})->name('get.started');

Route::middleware(['verified', 'auth'])->group(function (){

});

require __DIR__ . '/auth.php';

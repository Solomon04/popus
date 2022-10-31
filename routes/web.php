<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

Route::inertia('store', 'Popup/Store');
Route::inertia('/', 'Home');
Route::inertia('/fundraiser', 'Organizer/FundraiserDetail');
Route::inertia('/dashboard', 'Organizer/Dashboard');
Route::inertia('/checkout', 'Popup/Checkout');
Route::inertia('/summary', 'Popup/Summary');

Route::post('/checkout', function (\Illuminate\Http\Request $request){
   $data = [
       'email' => $request->get('email'),
       'phone' => $request->get('phone'),
       'first_name' => $request->get('first_name'),
       'last_name' => $request->get('last_name'),
       'address_line_one' => $request->get('address_line_one'),
       'address_line_two' => $request->get('address_line_two'),
       'city' => $request->get('city'),
       'state' => $request->get('state'),
       'country' => $request->get('country'),
       'postal_code' => $request->get('postal_code'),
   ];
});

require __DIR__.'/auth.php';

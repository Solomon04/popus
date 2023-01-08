<?php

use App\Http\Controllers\Webhook\ShopifyWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/shopify/webhook/order.fulfilled', [ShopifyWebhookController::class, 'orderFulfilled'])->name('shopify.webhook.order.fulfilled');
Route::post('/shopify/webhook/order.cancelled', [ShopifyWebhookController::class, 'orderCancelled'])->name('shopify.webhook.order.cancelled');
Route::post('/shopify/webhook/order.deleted', [ShopifyWebhookController::class, 'orderDeleted'])->name('shopify.webhook.order.deleted');

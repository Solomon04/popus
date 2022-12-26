<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Store;
use Artesaos\SEOTools\SEOTools;
use Inertia\Inertia;

class PopupStoreController extends Controller
{
    public function __construct(protected SEOTools $seo)
    {
    }

    public function show(Store $store)
    {
        $title = "{$store->user->first_name}'s Pop-Up Store";
        $description = 'Click here to buy gourmet popcorn and 50% of your purchase benefits the fundraiser.';
        $this->seo->setTitle($title);
        $this->seo->setDescription($description);
        $this->seo->addImages([asset('images/goodrun-seo-image.jpg')]);
        $this->seo->opengraph()->setTitle($title);
        $this->seo->opengraph()->setDescription($description);
        $this->seo->opengraph()->setUrl(route('popup.store', ['store' => $store]));
        $this->seo->opengraph()->addImages([asset('images/goodrun-seo-image.jpg')]);

        $store->load(['user', 'fundraiser', 'orders.customer', 'orders.cart.address']);
        $store->append(['leaderboard']);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id,
        ]);

        $products = Product::active()->take(6)->get();

        return Inertia::render('Popup/Store', [
            'products' => $products,
            'store' => $store,
            'cart' => $cart,
        ]);
    }
}

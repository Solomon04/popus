<?php

namespace App\Http\Controllers;

use App\Enums\FundraiserStatus;
use App\Helpers\Base64;
use App\Http\Requests\CreateStoreRequest;
use App\Models\Cart;
use App\Models\Fundraiser;
use App\Models\Product;
use App\Models\Store;
use Artesaos\SEOTools\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PopupStoreController extends Controller
{
    public function __construct(protected SEOTools $seo)
    {
    }

    public function index()
    {
        $user = $this->getCurrentUser();

        $stores = $user->stores()->with(['fundraiser'])->withCount(['orders'])->get();

        return Inertia::render('Popup/StoreDashboard', [
            'stores' => $stores,
        ]);
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

        return Inertia::render('Popup/StoreDetail', [
            'products' => $products,
            'store' => $store,
            'cart' => $cart,
        ]);
    }

    public function create(Fundraiser $fundraiser, Request $request)
    {
        $user = $this->getCurrentUser();
        if (! $request->hasValidSignature()) {
            return redirect()->route('stores');
        }

        if ($fundraiser->status === FundraiserStatus::ENDED) {
            return redirect()->route('stores');
        }

        if ($user && $fundraiser->stores()->where('user_id', '=', $user->id)->exists()) {
            return redirect()->route('stores');
        }

        $fundraiser->load('organizer');

        return Inertia::render('Popup/Join', [
            'fundraiser' => $fundraiser,
            'form_url' => URL::signedRoute('create.store', ['fundraiser' => $fundraiser]),
        ]);
    }

    public function store(CreateStoreRequest $request, Fundraiser $fundraiser)
    {
        $user = $this->getCurrentUser();
        if (! $request->hasValidSignature()) {
            // invalid
            dd('invalid');
        }

        if ($fundraiser->status === FundraiserStatus::ENDED) {
            // expired
            dd('expired');
        }

        if ($fundraiser->stores()->where('user_id', '=', $user->id)->exists()) {
            // already apart of fundraiser
            dd('already exist');
        }

        $imageName = Str::uuid().'.'.Base64::getImageType($request->input('avatar'));

        /** @var Store $store */
        $store = $fundraiser->stores()->create([
            'user_id' => $user->id,
            'avatar' => '',
            'description' => $request->input('description'),
        ]);

        $avatar = $store->addMediaFromBase64($request->input('avatar'))
            ->setFileName($imageName)
            ->toMediaCollection('avatars')->getFullUrl();

        $store->update(['avatar' => $avatar]);

        return redirect()->route('popup.store', ['store' => $store]);
    }
}

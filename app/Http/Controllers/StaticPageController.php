<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Artesaos\SEOTools\SEOTools;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function __construct(protected SEOTools $seo)
    {
    }

    public function index()
    {
        $this->seo->addImages([asset('images/macbook-popup.png')]);
        $stores = Store::with(['user', 'fundraiser'])->inRandomOrder()->take(6)->get();

        return Inertia::render('Home', [
            'stores' => $stores,
        ]);
    }

    public function about()
    {
        $title = 'About';
        $description = 'We are on a mission to make fundraising easier';
        $this->seo->setTitle($title);
        $this->seo->setDescription($description);
        $this->seo->addImages([asset('images/founder.jpeg')]);
        $this->seo->opengraph()->setTitle($title);
        $this->seo->opengraph()->setDescription($description);
        $this->seo->opengraph()->setUrl(route('about'));
        $this->seo->opengraph()->addImages([asset('images/founder.jpeg')]);

        return Inertia::render('About');
    }
}

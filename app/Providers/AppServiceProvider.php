<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Signifly\Shopify\Shopify;
use Stripe\StripeClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(Shopify::class, function (){
            return new Shopify(
                config('shopify.credentials.access_token'),
                config('shopify.credentials.domain'),
                config('shopify.credentials.api_version'),
            );
        });

        $this->app->bind(
            StripeClient::class,
            fn () => new StripeClient(config('services.stripe.secret'))
        );
    }
}

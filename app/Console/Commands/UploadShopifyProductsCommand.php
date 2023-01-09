<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Signifly\Shopify\REST\Resources\ProductResource;
use Signifly\Shopify\Shopify;

class UploadShopifyProductsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:shopify-upload-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update products in application DB using the Shopify API';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Shopify $shopify)
    {
        $products = $shopify->getCollectionProducts(config('shopify.credentials.collection'));

        $products->each(function (ProductResource $shopifyProduct) {
            $attributes = $shopifyProduct->getAttributes();
            $variant = $shopifyProduct->getVariants()->firstOrFail();

            $product = Product::updateOrCreate(['shopify_product_id' => $attributes['id']], [
                'shopify_product_id' => $variant['id'],
                'title' => $attributes['title'],
                'price' => $variant['price'],
                'image' => $attributes['image']['src'] ?? '',
                'active' => $attributes['status'] === 'active',
                'description' => $attributes['body_html'],
                'weight' => $variant['weight'],
            ]);

            $this->comment('Uploaded / Updated '.$product->title);
        });

        return Command::SUCCESS;
    }
}

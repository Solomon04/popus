<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignId('cart_id')->constrained('carts');
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('store_id')->constrained('stores');
            $table->text('status');
            $table->string('shopify_order_id')->nullable();
            $table->string('stripe_payment_id')->nullable();
            $table->double('sub_total', 8, 2);
            $table->double('shipping_total', 8, 2);
            $table->double('tax_total', 8, 2);
            $table->double('total', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};

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
            $table->foreignId('cart_id')->constrained('carts');
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('store_id')->constrained('stores');
            $table->string('shopify_order_id');
            $table->integer('sub_total');
            $table->integer('shipping_total');
            $table->integer('total');
            // stripe payment?
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

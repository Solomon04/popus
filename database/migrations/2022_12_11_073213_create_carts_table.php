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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            // don't add relation as foreign key as it will fail on initial insert
            $table->string('session_id');
            $table->boolean('active')->default(true);
            $table->foreignId('store_id')->nullable()->constrained('stores');
            $table->string('stripe_session_id')->nullable();
            $table->string('shippo_rate_id')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('customers');
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
        Schema::dropIfExists('carts');
    }
};

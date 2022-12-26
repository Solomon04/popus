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
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained('carts');
            $table->string('shippo_id');
            $table->string('provider');
            $table->string('name');
            $table->double('amount', 8, 2);
            $table->integer('days');
            $table->string('image');
            $table->string('description');
            $table->string('tracking_number')->nullable();

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
        Schema::dropIfExists('rates');
    }
};

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
        Schema::create('fundraisers', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignId('organizer_id')->constrained('users');
            $table->string('name');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('activity')->nullable();
            $table->string('affiliation')->nullable();
            $table->integer('goal');
            $table->integer('participant_count');
            $table->string('code')->unique();
            $table->boolean('paid_out')->default(false);
            $table->string('city');
            $table->string('state');
            $table->string('postal_code');
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
        Schema::dropIfExists('fundraisers');
    }
};

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
            $table->uuid('uuid');
            $table->foreignId('organizer_id')->constrained('users');
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->foreignId('activity_id')->constrained('activities');
            $table->integer('goal_amount');
            $table->integer('participant_count');
            $table->string('code');
            $table->boolean('paid_out')->default(false);
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

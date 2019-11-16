<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->string('tenant_name')->unique();
            $table->string('tenant_text');
            $table->boolean('is_leap_link_active');
            $table->string('leap_link_time_from')->nullable();
            $table->string('leap_link_time_to')->nullable();
            $table->string('leap_link_url')->nullable();
            $table->string('leap_link_timezone')->nullable();
            $table->string('thumb_image_url')->nullable();
            $table->string('status');
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
        Schema::dropIfExists('tenants');
    }
}

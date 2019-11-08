<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('tenant_id');
            $table->string('title');
            $table->string('url');
            $table->string('status')->default('created');
            $table->string('link_type')->nullable();//simple,thumb,
            $table->boolean('is_scheduled')->default(false);
            $table->datetime('scheduled_from')->nullable();
            $table->datetime('scheduled_to')->nullable();
            $table->datetime('scheduled_timezone')->nullable();
            $table->datetime('style_id')->nullable();
            $table->string('thumb_url')->nullable();
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
        Schema::dropIfExists('links');
    }
}

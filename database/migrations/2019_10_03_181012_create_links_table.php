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
            $table->integer('tenantid');
            $table->string('title');
            $table->string('url');
            $table->string('link_type');
            $table->boolean('is_scheduled');
            $table->datetime('scheduled_from');
            $table->datetime('scheduled_to');
            $table->datetime('scheduled_timezone');
            $table->datetime('style_id');
            $table->string('thumb_url');
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

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable=['user_id','tenant_name','is_leap_link_active','leap_link_time_from','leap_link_time_to','leap_link_url','leap_link_timezone','thumb_image_url','status'];
}

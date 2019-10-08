<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{

    protected $fillable = [ 
        'tenant_id', 'title', 'url', 'link_type', 'is_scheduled', 'scheduled_from', 'scheduled_to', 'scheduled_timezone', 'style_id', 'thumb_url'
    ];

}

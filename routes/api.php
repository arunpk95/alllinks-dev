<?php

use Illuminate\Http\Request;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::group([
    'prefix' => 'auth'
], function () {

    Route::post('user/login', 'API\UserController@login');
    Route::post('user/register', 'API\UserController@register');
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('user/logout', 'API\UserController@logout');
        Route::get('user/details', 'API\UserController@details');
    });
});




Route::post('link', 'API\LinkController@store');

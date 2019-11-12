<?php

use Illuminate\Http\Request;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::group([
    'prefix' => 'auth/user'
], function () {

    Route::post('login', 'API\UserController@login');
    Route::post('register', 'API\UserController@register');
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'API\UserController@logout');
        Route::get('details', 'API\UserController@details');
        Route::post('uploadAvatar','API\UserController@uploadAvatar');
    });
});


Route::group([
    'prefix' => 'link',
    'middleware' => 'auth:api'], function () {

    Route::post('create', 'API\LinkController@store');
    Route::post('update/{id}', 'API\LinkController@update');
    Route::post('updatestatus/{id}', 'API\LinkController@updatestatus');

    Route::post('delete/{id}', 'API\LinkController@delete');
    Route::get('all/{id}', 'API\LinkController@all');
    Route::post('changeorder', 'API\LinkController@changeorder');

});

Route::group([
    'prefix' => 'tenant',
    'middleware' => 'auth:api'], function () {

    Route::post('create', 'API\TenantController@store');
    Route::post('update/{id}', 'API\TenantController@update');
    Route::delete('delete/{id}', 'API\TenantController@delete');
    Route::get('details/{id}', 'API\TenantController@details');
    Route::get('all', 'API\TenantController@all');
    

});


Route::post('link', 'API\LinkController@store');

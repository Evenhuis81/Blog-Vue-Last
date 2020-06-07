<?php

Route::group(['prefix' => 'auth', 'middleware' => 'throttle:10,1'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('details', 'AuthController@details');
    });
});

Route::get('blogs', 'BlogController@index');
Route::resource('categories', 'CategoryController');

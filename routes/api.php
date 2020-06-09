<?php

Route::group(['prefix' => 'auth', 'middleware' => 'throttle:60,5'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        // Dont really want to throttle details, but then more complex/cluttered grouping
        Route::get('details', 'AuthController@details');
    });
});

Route::get('blogs', 'BlogController@index');
Route::resource('categories', 'CategoryController');

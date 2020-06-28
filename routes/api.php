<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
    Route::get('details', 'AuthController@details');
});

Route::resource('blogs', 'BlogController');
Route::resource('categories', 'CategoryController');
Route::resource('comments', 'CommentController');

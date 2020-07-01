<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
    Route::get('details', 'AuthController@details');
});

Route::resource('blogs', 'BlogController', ['except'=> ['create', 'show', 'edit']]);
Route::resource('categories', 'CategoryController', ['except'=> ['create', 'show', 'edit']]);
Route::resource('comments', 'CommentController', ['except'=> ['create', 'show', 'edit']]);

<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
    Route::get('details', 'AuthController@details');
});

Route::resource('blogs', 'BlogController', ['except'=> ['create', 'show', 'edit']]);
Route::resource('categories', 'CategoryController', ['except'=> ['create', 'show', 'edit']]);
Route::resource('comments', 'CommentController', ['except'=> ['create', 'show', 'edit']]);

Route::post('mail', function() {
    // dd(config('mail'));
    // send the email
    request()->validate(['email' => 'required|email']);
    Mail::raw('it works', function($message) {
        $message->to(request('email'))
        ->subject('Hello There');
    });
    return response()->json('Email send');
});

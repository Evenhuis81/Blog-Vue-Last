<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    
    // Route::group(['middlware' => 'auth:api'], function () {
        Route::post('logout', 'AuthController@logout');
        Route::post('details', 'AuthController@details');
    // });
    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');
});




Route::get('blogs', 'BlogController@index');
Route::resource('categories', 'CategoryController');

// Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
//     Route::post('login', 'AuthController@login');
//     Route::post('register', 'AuthController@register');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');
// });

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

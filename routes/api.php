<?php

use Illuminate\Http\Request;

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

Route::middleware(['auth:api'])->group(function() {
  Route::get('/user', function(Request $request) {
    return $request->user();
  });

 Route::get('/user/logged', function () {
   return response()->json(['home' => url('').'/home',
   'data' => Auth::guard('api')->check()]);
 });

 Route::apiResource('projects', 'ProjectController')->only([
   'store','index', 'show', 'update', 'destroy'
 ]);

 Route::apiResource('tasks', 'TaskController')->only([
   'show', 'store', 'destroy', 'update', 'index'
 ]);

 Route::put('tasks/priority', 'TaskController@updatePriority');

});


Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

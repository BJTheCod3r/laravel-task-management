<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'index', ['private_page' => 0])->name('index');

Route::view('/home', 'home', ['private_page' => 1])->name('home');

Route::view('/projects/create', 'project.create', ['private_page' => 1]);

Route::view('/projects', 'project.index', ['private_page' => 1]);

Route::get('/projects/{id}', 'ProjectController@showWeb');

Route::get('/projects/{id}/edit', 'ProjectController@showEdit');

Route::view('/tasks', 'task.index', ['private_page' => 1]);

Route::view('/tasks/create', 'task.create', ['private_page' => 1]);

Route::get('/tasks/{id}', 'TaskController@showWeb');

Route::get('/tasks/{id}/edit', 'TaskController@showEdit');

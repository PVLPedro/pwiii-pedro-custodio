<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/game', [GameController::class, 'index'])->name('search');
Route::get('/game/search/{name}', [GameController::class, 'search'])->name('search');
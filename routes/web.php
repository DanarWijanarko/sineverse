<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Main\MovieController;
use App\Http\Controllers\Main\SeriesController;
use App\Http\Controllers\Auth\RegisterController;

Route::name('auth.')->group(function () {
	Route::post('login', [LoginController::class, 'authenticate'])->name('login');
	Route::post('register', [RegisterController::class, 'store'])->name('register');
	Route::post('logout', [LoginController::class, 'destroy'])->name('logout')->middleware('auth');
});

Route::name('main.')->group(function () {
	Route::get('/', function () {
		return inertia('Main/Home/Index');
	})->name('home.index');

	// ! Movies
	Route::prefix('/movies')->name('movies.')->group(function () {
		Route::get('/', [MovieController::class, 'index'])->name('index');
		Route::get('/{slug}/q', [MovieController::class, 'show'])->name('detail');
	});

	Route::get('/coming-soon', function () {
		return inertia('Main/ComingSoon/Index');
	})->name('coming.index');

	// ! Series
	Route::prefix('/series')->name('series.')->group(function () {
		Route::get('/', [SeriesController::class, 'index'])->name('index');
		Route::get('/{slug}/q', [SeriesController::class, 'show'])->name('detail');
	});

	Route::get('/forum', function () {
		return inertia('Main/Forum/Index');
	})->name('forum.index');

	Route::get('/profile', function () {
		return inertia('Main/Profile/Index');
	})->name('index')->middleware('auth');
});

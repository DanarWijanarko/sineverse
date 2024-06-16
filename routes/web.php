<?php

use Illuminate\Support\Facades\Route;

Route::name('main.')->group(function () {
    Route::get('/', function () {
        return inertia('Main/Home/Index');
    })->name('home.index');

    // ! Movies
    Route::get('/movies', function () {
        return inertia('Main/Home/Index');
    })->name('movies.index');
    // Route::prefix('/movies')->name('movies.')->group(function () {
    //     Route::get('/', [MovieController::class, 'index'])->name('index');
    //     Route::get('/{slug}/q', [MovieController::class, 'show'])->name('detail');
    // });

    Route::get('/coming-soon', function () {
        return inertia('Main/ComingSoon/Index');
    })->name('coming.index');

    // ! Series
    Route::get('/series', function () {
        return inertia('Main/Home/Index');
    })->name('series.index');
    // Route::prefix('/series')->name('series.')->group(function () {
    //     Route::get('/', [SeriesController::class, 'index'])->name('index');
    //     Route::get('/{slug}/q', [SeriesController::class, 'show'])->name('detail');
    // });

    Route::get('/forum', function () {
        return inertia('Main/Forum/Index');
    })->name('forum.index');

    Route::get('/profile', function () {
        return inertia('Main/Profile/Index');
    })->name('index')->middleware('auth');
});

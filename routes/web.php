<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\userMainController;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/userList', userMainController::class)->middleware(['auth', 'verified'])->name('user.main'); 

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'userCount' => User::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::post('/userList', [userMainController::class,'create'])->name('user.create');
    Route::put('/userList/{id}', [userMainController::class,'update'])->name('user.update');
    Route::delete('/userList/{id}', [userMainController::class,'destroy'])->name('user.destroy');
});

require __DIR__.'/auth.php';
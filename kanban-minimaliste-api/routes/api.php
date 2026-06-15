<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\TagController;

Route::prefix('V1')->group(function () {
    Route::apiResource('task', TaskController::class);
    Route::get('task/priority/{priority}', [TaskController::class, 'showByPriority']);

    Route::apiResource('tag', TagController::class);
    Route::post('task/{task}/tags/{tag}',   [TaskController::class, 'attachTag']);
    Route::delete('task/{task}/tags/{tag}', [TaskController::class, 'detachTag']);
});
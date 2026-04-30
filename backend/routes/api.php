<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// ----------------- Auth Routes -----------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// ----------------- User Info Route -----------------
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'status' => true,
        'data' => $request->user()
    ]);
});

// ----------------- Settings Routes -----------------
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/settings', [SettingController::class, 'index']);
    Route::post('/settings', [SettingController::class, 'store']);

     Route::prefix('enquiries')->group(function () {
        Route::get('/', [EnquiryController::class, 'index']);
        Route::post('/', [EnquiryController::class, 'store']);
        Route::get('/search', [EnquiryController::class, 'search']);
        Route::get('/stats', [EnquiryController::class, 'stats']);
        Route::get('/{id}', [EnquiryController::class, 'show']);
        Route::post('/{id}', [EnquiryController::class, 'update']);
        Route::delete('/{id}', [EnquiryController::class, 'destroy']);
        Route::patch('/{id}/status', [EnquiryController::class, 'toggleStatus']);
    });
});

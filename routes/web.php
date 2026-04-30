<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    $path = public_path('dist/index.html');
    if (!file_exists($path)) {
        return "React app not built. Run 'npm run build' inside task-manager-frontend.";
    }
    return file_get_contents($path);
})->where('any', '.*');

<?php

// Aktifkan laporan error lengkap
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Siapkan direktori temporary /tmp
    $dirs = [
        '/tmp/storage/app/public',
        '/tmp/storage/framework/views',
        '/tmp/storage/framework/cache/data',
        '/tmp/storage/framework/sessions',
        '/tmp/storage/logs',
        '/tmp/bootstrap/cache',
    ];

    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
    }

    putenv('APP_SERVICES_CACHE=/tmp/bootstrap/cache/services.php');
    putenv('APP_PACKAGES_CACHE=/tmp/bootstrap/cache/packages.php');
    putenv('APP_CONFIG_CACHE=/tmp/bootstrap/cache/config.php');
    putenv('APP_ROUTES_CACHE=/tmp/bootstrap/cache/routes.php');
    putenv('APP_EVENTS_CACHE=/tmp/bootstrap/cache/events.php');
    putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    throw new \Exception("Folder vendor/autoload.php tidak ditemukan di environment Vercel.");
}

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->useStoragePath('/tmp/storage');

$app->handleRequest(\Illuminate\Http\Request::capture());


} catch (\Throwable $e) {
    // Tulis ke stderr supaya muncul di Runtime Logs Vercel
    error_log($e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    error_log($e->getTraceAsString());

    // Tampilkan di browser (sementara, hapus setelah debugging)
    http_response_code(500);
    echo "<h1>Error</h1>";
    echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p><strong>File:</strong> " . htmlspecialchars($e->getFile()) . ":" . $e->getLine() . "</p>";
    echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    // JANGAN pakai exit(1)
}
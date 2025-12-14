<?php
// proxy.php - Generic Proxy for Cachalot API (Clean Version)

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Cachalot-Secret");

// Handle Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration
// TARGETING PORT 8002 DIRECTLY to bypass potential Nginx issues/conflicts
$vpsHost = "http://80.74.28.245:8002";
$targetPath = $_GET['path'] ?? '/api/chat';
$url = $vpsHost . $targetPath;

// Get Request Data
$method = $_SERVER['REQUEST_METHOD'];
$inputData = file_get_contents("php://input");
$headers = getallheaders();

// Init cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $inputData);
// Timeout to prevent hanging
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Forward Headers
$forwardHeaders = [
    "Content-Type: application/json"
];
if (isset($headers['X-Cachalot-Secret'])) {
    $forwardHeaders[] = "X-Cachalot-Secret: " . $headers['X-Cachalot-Secret'];
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $forwardHeaders);

// Execute
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

// debug logging (optional)
// file_put_contents('proxy_debug.log', date('Y-m-d H:i:s') . " $method $url -> $httpCode ($curlError)\n", FILE_APPEND);

if ($curlError) {
    http_response_code(502); // Bad Gateway
    echo json_encode([
        "error" => "Proxy Error",
        "details" => $curlError,
        "target" => $url
    ]);
} else {
    http_response_code($httpCode);
    echo $response;
}
?>
<?php
require_once __DIR__ . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


$dbhost = $_ENV['DB_HOST'];
$dbuser = $_ENV['DB_USER'];
$port = $_ENV['DB_PORT'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

echo $hostname;
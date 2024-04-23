<?php
require_once __DIR__ . "/../../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(dirname(dirname(__DIR__)));
$dotenv->load();

$dbhost = $_ENV['DB_HOST'];
$dbuser = $_ENV['DB_USER'];
$port = $_ENV['DB_PORT'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$dsn = "mysql:host=$dbhost";

try {
    $conn = new PDO($dsn, $dbuser, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE DATABASE IF NOT EXISTS productsdb";
    $conn->exec($sql);
    $sql = "USE productsdb";
    $conn->exec($sql);

    $sql = "CREATE TABLE IF NOT EXISTS products (
                sku varchar(255) PRIMARY KEY,
                name varchar(255) NOT NULL,
                price float NOT NULL,
                product_type varchar(255) NOT NULL,
                product_value varchar(255) NOT NULL
    )";
    $conn->exec($sql);

    echo "migration successful";

} catch (PDOException $e) {
    echo $e->getMessage();
}



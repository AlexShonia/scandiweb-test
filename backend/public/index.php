<?php

use app\core\Application;

require_once __DIR__ . "/../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$config = [
    "dbhost" => $_ENV['DB_HOST'],
    "dbuser" => $_ENV['DB_USER'],
    "dbport" => $_ENV['DB_PORT'],
    "dbpass" => $_ENV['DB_PASSWORD'],
    "dbname" => $_ENV['DB_NAME'],
];

$app = new Application($config);

$app->router->get("/", function () {
    return "product";
});

$app->router->post("/add", function () {
    $sku = $_POST['sku'];
    $name = (string)$_POST['name'];
    $price = $_POST['price'];
    $productType = $_POST['productType'];
    $productValue = $_POST['productValue'];

    Application::$db->query(
        "INSERT INTO products
        (sku, name, price, product_type, product_value)
        VALUES ($sku, '$name', $price, '$productType', '$productValue');"
    );

    return "add product";
});

$app->router->post("/delete", function () {
    return "delete product";
});

// $app->run();
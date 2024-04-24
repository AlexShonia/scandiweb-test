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
    $res = Application::$db->query(
        "SELECT * FROM products;"
    );
    $jsonResponse = json_encode($res);

    return $jsonResponse;
});

$app->router->post("/add", function () {
    $sku = $_POST['sku'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $productType = $_POST['productType'];
    $productValue = $_POST['productValue'];

    $res = Application::$db->query(
        "INSERT INTO products
        (sku, name, price, product_type, product_value)
        VALUES ($sku, '$name', $price, '$productType', '$productValue');"
    );
    $jsonResponse = json_encode($res);

    return $jsonResponse;
});

$app->router->post("/delete", function () {
    $skuArr = file_get_contents("php://input");
    $skuArr = json_decode($skuArr);
    var_dump($skuArr->skuArr[2]);

    for ($i = 0; $i < count($skuArr->skuArr); $i++) {
        Application::$db->query(
            "DELETE FROM products
             WHERE sku = " . $skuArr->skuArr[$i] . ";"
        );
    }

    return "Deleted";
});

// $app->run();
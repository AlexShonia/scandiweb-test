<?php

header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

use app\core\Application;
use app\models\Product;
use app\models\ProductDao;

require_once __DIR__ . "/../vendor/autoload.php";


$config = [
    "dbhost" => $_ENV['DB_HOST'],
    "dbuser" => $_ENV['DB_USER'],
    "dbport" => $_ENV['DB_PORT'],
    "dbpass" => $_ENV['DB_PASSWORD'],
    "dbname" => $_ENV['DB_NAME'],
];

$app = new Application($config);

$app->router->get("/", function () {
    $products = ProductDao::getAll();
    return json_encode($products);
});

$app->router->post("/add", function () {
    $productData = json_decode(file_get_contents("php://input"));

    $product = new Product($productData->sku, $productData->name, $productData->price, $productData->productType, $productData->productValue);
    return $product->save();
});

$app->router->post("/delete", function () {
    $skuArray = json_decode(file_get_contents("php://input"));
    for ($i = 0; $i < count($skuArray->skuArr); $i++) {
        ProductDao::get($skuArray->skuArr[$i])->delete();
    }

    return "Deleted";
});

$app->run();


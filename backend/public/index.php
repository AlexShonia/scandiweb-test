<?php

$allowedOrigins = [
    'http://127.0.0.1:5173',
];

if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
} else {
    http_response_code(403);
    exit('Access Forbidden');
}

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
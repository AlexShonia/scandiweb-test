<?php

namespace app\models;

use App\core\Application;

class ProductDao implements Dao
{
    public static function getAll()
    {
        $res = Application::$db->query(
            "SELECT * FROM products;",
            []
        );
        $products = [];
        foreach ($res as $row) {
            $product = new Product($row['sku'], $row['name'], $row['price'], $row['product_type'], $row['product_value'], );
            $products[] = $product;
        }

        return $products;
    }

    public static function get($sku)
    {
        $product = Application::$db->query(
            "SELECT * FROM products WHERE sku = ?",
            [$sku]
        );
        $product = $product[0];
        return new Product($product['sku'], $product['name'], $product['price'], $product['product_type'], $product['product_value']);
    }
    public static function save($item)
    {
        $sku = $item->getSku();
        $name = $item->getName();
        $price = $item->getPrice();
        $productType = $item->getProductType();
        $productValue = $item->getProductValue();

        $res = Application::$db->query(
            "INSERT INTO products
        (sku, name, price, product_type, product_value)
        VALUES (?, ?, ?, ?, ?);",
            [$sku, $name, $price, $productType, $productValue]
        );
        $jsonResponse = json_encode($res);

        return $jsonResponse;
    }
    public static function delete($item)
    {
        Application::$db->query(
            "DELETE FROM products
             WHERE sku = " . "?" . ";",
            [$item->getSku()]
        );
    }
}
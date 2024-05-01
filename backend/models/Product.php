<?php

namespace app\models;

use app\core\Application;

class Product implements Model
{
    public string $sku;
    public string $name;
    public string $price;
    public string $productType;
    public string $productValue;

    public function __construct($sku, $name, $price, $productType, $productValue)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productType = $productType;
        $this->productValue = $productValue;
    }

    public function getSku(): string
    {
        return $this->sku;
    }
    public function setSku(string $sku): void
    {
        $this->sku = $sku;
    }
    public function getName(): string
    {
        return $this->name;
    }
    public function setName(string $name): void
    {
        $this->name = $name;
    }
    public function getPrice(): string
    {
        return $this->price;
    }
    public function setPrice(string $price): void
    {
        $this->price = $price;
    }
    public function getProductType(): string
    {
        return $this->productType;
    }
    public function setProductType(string $productType): void
    {
        $this->productType = $productType;
    }
    public function getProductValue(): string
    {
        return $this->productValue;
    }
    public function setProductValue(string $productValue): void
    {
        $this->productValue = $productValue;
    }
    public function save()
    {
        return ProductDao::save($this);
    }
    public function delete()
    {
        return ProductDao::delete($this);
    }

}
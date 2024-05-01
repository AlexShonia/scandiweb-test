<?php

namespace app\models;

interface Dao
{
    public static function getAll();
    public static function get($primary);
    public static function save($item);
    public static function delete($item);
}
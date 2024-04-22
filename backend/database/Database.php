<?php

namespace app\database;

use PDO;

class Database
{
    protected $pdo;

    public function __construct($connection_string, $user, $password)
    {
        $pdo = new PDO;

    }


}
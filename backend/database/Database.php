<?php

namespace app\database;

use PDO;

class Database
{
    protected $pdo;

    public function __construct(string $dsn, string $user, string $password)
    {
        $this->pdo = new PDO($dsn, $user, $password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function query(string $sql, array $args)
    {
        $result = $this->pdo->prepare($sql);
        $result->execute($args);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

}
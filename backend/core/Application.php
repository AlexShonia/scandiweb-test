<?php
namespace app\core;

use app\database\Database;

class Application
{
    public Router $router;
    public static Database $db;
    public static Application $app;

    public function __construct($config)
    {
        self::$app = $this;
        $this->router = new Router;
        $this->connectToDb($config);
    }

    private function connectToDb($config)
    {
        $dbhost = $config['dbhost'];
        $dbport = $config['dbport'];
        $dbname = $config['dbname'];
        $dsn = "mysql:host=$dbhost;port=$dbport;dbname=$dbname";
        self::$db = new Database(
            $dsn,
            $config['dbuser'],
            $config['dbpass']
        );
    }

    // public function run()
    // {
    // }

}
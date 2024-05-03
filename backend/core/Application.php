<?php
namespace app\core;

use app\database\Database;

class Application
{
    public Router $router;
    public static Database $db;
    public static Application $app;
    public Request $request;
    public Response $response;

    public function __construct($config)
    {
        $this->request = new Request;
        $this->response = new Response;
        $this->router = new Router($this->request, $this->response);
        $this->connectToDb($config);
    }

    private function connectToDb(array $config): void
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
    public function run()
    {
        try {
            echo $this->router->resolve();
        } catch (\Exception $e) {
            $this->response->setStatusCode($e->getCode());
        }
    }
}
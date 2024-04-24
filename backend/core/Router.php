<?php

namespace app\core;

class Router
{
    public function get(string $url, $callback)
    {
        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            if ($_SERVER['REQUEST_URI'] == $url) {
                echo $callback();
            }
        }
    }

    public function post(string $url, $callback)
    {
        if ($_SERVER['REQUEST_METHOD'] == "POST") {
            if ($_SERVER['REQUEST_URI'] == $url) {
                echo $callback();
            }
        }
    }
}
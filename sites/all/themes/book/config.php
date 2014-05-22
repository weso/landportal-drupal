<?php

$landportal_uris_path = drupal_get_path("module", "landportal_uris");
$theme_path = drupal_get_path("theme", "book");
$server_name = $_SERVER["HTTP_HOST"];

return array(
    "ajax_path" => "$landportal_uris_path/ajax",
    "sparql_path" => "http://156.35.82.103:1300/sparql",
    "server_name" => $server_name,
    "full_theme_path" => "http://$server_name/$theme_path",
);

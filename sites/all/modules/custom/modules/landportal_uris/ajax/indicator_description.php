<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');

$indicator_id = $_GET["indicator"];
$language = $_GET["language"];

header('Content-Type: application/json');
echo indicator_description($indicator_id, $language);


function indicator_description($indicator_id, $language) {
    $database = new DataBaseHelper();
    $database->open();
    $indicator_id = $database->escape($indicator_id);
    $language = $database->escape($language);

    $description = $database->query("indicator_description", array($language, $indicator_id));
    if (count($description) > 0) {
        return json_encode(array("description" => $description[0]["description"]));
    }
    return json_encode(array("description" => ""));
}

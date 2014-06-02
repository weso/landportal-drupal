<?php
require_once("../model/database.php");
require_once("../helpers/observations_by_country_indicator.php");

$country1 = $_GET["country1"];
$country2 = $_GET["country2"];
$indicator = $_GET["indicator"];
$language = $_GET["language"];

header('Content-Type: application/json');
echo observations_by_country($country1, $country2, $indicator, $language);

function observations_by_country($country1, $country2, $indicator, $language) {
  $cached = get_from_cache($country1, $country2 , $indicator, $language);
  if ($cached !== null):
    return $cached;
  else:
    $database = new DataBaseHelper();
    $connection = $database->open();
    $result = get_observations_by_country_indicator($country1, $country2, $indicator,
        $language, $connection, $database);
    $json_result = json_encode($result);
    if (function_exists("apc_store")):
      apc_store(generate_cache_key($region, $indicator, $language), $json_result);
    endif;
    $database->close($connection);
    return $json_result;
  endif;
}

function get_from_cache($country1, $country2, $indicator, $language) {
  $key = generate_cache_key($country1, $country2, $indicator, $language);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}

function generate_cache_key($country1, $country2, $indicator, $language) {
  return hash('md5', "observations_by_country" . $country1 . $country2 . $indicator . $language);
}

<?php
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');

$region = $_GET["region"];
$indicator = $_GET["indicator"];
$language = $_GET["language"];

setlocale(LC_ALL, $language);
header('Content-Type: application/json');
echo observations_by_region($region, $indicator, $language);


function observations_by_region($region, $indicator, $language) {
  $cache = new CacheHelper('observations_by_region', array(
        $region,
        $indicator,
        $language
  ));
  $cached = $cache->get();
  if ($cached !== null)
    return $cached;

  $database = new DataBaseHelper();
  $database->open();
  $region = $database->escape($region);
  $indicator = $database->escape($indicator);
  $regionFilter = $region == 1 ? "" : "r.un_code = $region AND";
  $observations = $database->query("observations_by_region", array($language, $regionFilter, $indicator));
  $all_countries = $database->query("all_countries", array($language));
  $database->close();
  $result = json_encode(compose_data($observations, $all_countries));
  $cache->store($result);
  return $result;
}

function compose_data($observations, $all_countries) {
  $all_observations = array();

  $observations_by_year = array();

  $observations_by_country = array();

  $organization_id = "";
  $organization_name = "";

  $all_countries_array = [];

  for ($i = 0; $i < count($all_countries); $i++) {
    $countryCode = $all_countries[$i]["iso3"];
    $countryName = utf8_encode($all_countries[$i]["country_name"]);

    $continent = utf8_encode($all_countries[$i]["un_code"]);
    $continent_name = utf8_encode($all_countries[$i]["region_name"]);

    $observation = array(
      "code" => $countryCode,
      "name" => $countryCode,
      "countryName" => $countryName,
      "time" => null,
      "value" => null,
      "values" => array(null),
      "continent" => $continent,
      "continent_name" => $continent_name
    );

    $all_countries_array[$countryCode] = $observation;
  }

  for ($i = 0; $i < count($observations); $i++) {
    $previous_value = $observations[$i]["previous_value"];
    $countryCode = $observations[$i]["iso3"];
    $countryName = utf8_encode($observations[$i]["country_name"]);
    $time = $observations[$i]["ref_time_value"];

    $continent = utf8_encode($observations[$i]["continent"]);
    $continent_name = utf8_encode($observations[$i]["continent_name"]);

    $organization_id = $observations[$i]["organization_id"];
    $organization_name = $observations[$i]["organization_name"];

    $value = (float)$observations[$i]["value"];

    if ($previous_value !== null)
      $previous_value = (float)$previous_value;

    $country = array(
      "faoURI" => utf8_encode($observations[$i]["faoURI"]),
      "iso2" => $observations[$i]["iso2"],
      "iso3" => $countryCode,
      "name" => $countryName
    );

    $indicator = array(
      "id" => $observations[$i]["ind_id"],
      "name" => utf8_encode($observations[$i]["ind_name"]),
      "description" => utf8_encode($observations[$i]["ind_description"]),
      "last_update" => $observations[$i]["ind_last_update"],
      "preferable_tendency" => $observations[$i]["ind_preferable_tendency"],
      "starred" => $observations[$i]["ind_starred"],
      "organization_id" => $organization_id,
      "organization_name" => $organization_name
    );

    $observation = array(
      "code" => $countryCode,
      "name" => $countryCode,
      "countryName" => $countryName,
      "country" => $country,
      "indicator" => $indicator,
      "time" => $time,
      "value" => $value,
      "values" => array($value),
      "previous_value" => $previous_value,
      "continent" => $continent,
      "continent_name" => $continent_name
    );

    array_push($all_observations, $observation);

    if (!array_key_exists($time, $observations_by_year))
      $observations_by_year[$time] = array();

    array_push($observations_by_year[$time], $observation);

    if (!array_key_exists($countryCode, $observations_by_country))
      $observations_by_country[$countryCode] = $observation;

    $previous_time = $observations_by_country[$countryCode]["time"];

    if ($time > $previous_time)
      $observations_by_country[$countryCode] = $observation;

    $previous_time = $all_countries_array[$countryCode]["time"];

    if ($previous_time == null || $time > $previous_time)
      $all_countries_array[$countryCode] = $observation;
  }

  return array("all" => $all_observations,
              "by_year" => $observations_by_year,
              "by_country" => array_values($observations_by_country),
              "organization_id" => $organization_id,
              "organization_name" => $organization_name,
              "all_countries" => array_values($all_countries_array));
}

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
    if ($cached !== null) {
        return $cached;
    }
    $database = new DataBaseHelper();
    $database->open();
    $region = $database->escape($region);
    $indicator = $database->escape($indicator);
    $regionFilter = $region == 1 ? "" : "regions.un_code = $region AND";
    $observations = $database->query("observations_by_region", array($language, $regionFilter, $indicator));
    $database->close();
    $result = json_encode(compose_data($observations));
    $cache->store($result);
    return $result;
}

function compose_data($observations) {
  $all_observations = array();

  $observations_by_year = array();

  $observations_by_country = array();

  $organization_id = "";
  $organization_name = "";

  for ($i = 0; $i < count($observations); $i++) {
    $previous_value = $observations[$i]["previous_value"];
    $countryCode = $observations[$i]["iso3"];
    $countryName = utf8_encode($observations[$i]["country_name"]);
    $time = $observations[$i]["ref_time_value"];

    $organization_id = $observations[$i]["organization_id"];
    $organization_name = $observations[$i]["organization_name"];

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
      "countryName" => $countryName,
      "country" => $country,
      "indicator" => $indicator,
      "time" => $time,
      "value" => (float)$observations[$i]["value"],
      "previous_value" => $previous_value
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
  }
  return array("all" => $all_observations,
              "by_year" => $observations_by_year,
              "by_country" => array_values($observations_by_country),
              "organization_id" => $organization_id,
              "organization_name" => $organization_name);
}

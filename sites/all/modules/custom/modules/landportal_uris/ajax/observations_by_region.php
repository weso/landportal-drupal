 <?php
include_once("../model/database.php");

$region = $_GET["region"];
$indicator = $_GET["indicator"];
$language = $_GET["language"];

setlocale(LC_ALL, $language);

$cached = get_from_cache($language, $indicator, $language);
if ($cached !== null)
  return $cached;

$database = new DataBaseHelper();
$connection = $database->open();
$regionFilter = $region == 1 ? "" : "regions.un_code = $region AND";
$observations = $database->query($connection, "observations_by_region", array($language, $regionFilter, $indicator));
$database->close($connection);
$result = compose_data($observations);

if (function_exists("apc_store"))
  apc_store(generate_cache_key($region, $indicator, $language), $result);

header('Content-Type: application/json');
echo json_encode($result);

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

function get_from_cache($region, $indicator, $language) {
  $key = generate_cache_key($region, $indicator, $language);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}

function generate_cache_key($region, $indicator, $language) {
  return hash('md5', "observations_by_region" . $region . $indicator . $language);
}

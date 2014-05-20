 <?php
include_once("../model/database.php");
header('Content-Type: application/json');

$country = $_GET["country"];
$indicator = $_GET["indicator"];
$language = $_GET["language"];

$cached = get_from_cache($country, $indicator, $language);
if ($cached !== null) {
  echo $cached;
  return;
}

$database = new DataBaseHelper();
$connection = $database->open();
$observations = $database->query($connection, "observations_by_country", array($language, $country, $indicator));
$database->close($connection);
$result = json_encode(compose_data($observations));

if (function_exists("apc_store"))
  apc_store(generate_cache_key($country, $indicator, $language), $result);


echo $result;


function compose_data($observations) {
  $result = array();
  for ($i = 0; $i < count($observations); $i++) {
    $country = array(
      "faoURI" => utf8_encode($observations[$i]["faoURI"]),
      "iso2" => $observations[$i]["iso2"],
      "iso3" => $observations[$i]["iso3"],
      "name" => utf8_encode($observations[$i]["country_name"])
    );
    $indicator = array(
      "id" => $observations[$i]["ind_id"],
      "name" => utf8_encode($observations[$i]["ind_name"]),
      "description" => utf8_encode($observations[$i]["ind_description"]),
      "last_update" => $observations[$i]["ind_last_update"],
      "preferable_tendency" => $observations[$i]["ind_preferable_tendency"],
      "starred" => $observations[$i]["ind_starred"]
    );
    $observation = array(
      "country" => $country,
      "indicator" => $indicator,
      "ref_time" => array(
        "value" => $observations[$i]["ref_time_value"]
      ),
      "value" => array(
        "value" => number_format((float)$observations[$i]["value"], 2, '.', '')
      )
    );
    array_push($result, $observation);
  }
  return $result;
}

function get_from_cache($country, $indicator, $language) {
  $key = generate_cache_key($country, $indicator, $language);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}

function generate_cache_key($country, $indicator, $language) {
  return hash('md5', "observations_by_country" . $country . $indicator . $language);
}

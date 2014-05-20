 <?php
header('Content-Type: application/json');
include_once("../model/database.php");

$country = $_GET["country"];
$language = $_GET["language"];

$cached = get_from_cache($country, $language);
if ($cached !== null) {
  echo json_encode($cached);
  return;
}

$database = new DataBaseHelper();
$connection = $database->open();
$observations = $database->query($connection, "observations_by_country_starred", array($language, $country));
$database->close($connection);
$result = compose_data($observations);

if (function_exists("apc_store"))
  apc_store(generate_cache_key($country, $language), $result);

echo json_encode($result);


/**
 * Compose the data to marshall and send to the view.
 * @return an array with all the required data.  This data can be json-encoded before sending.
 */
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


/**
 * Fetch a value from the cache.
 * @return The value stored in cache or null if not found.
 */
function get_from_cache($country, $language) {
  $key = generate_cache_key($country, $language);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}


/**
 * Generates a unique key that can be used as a key in the cache.
 * @return md5 hash to use as key
 */
function generate_cache_key($country, $language) {
  return hash('md5', "observations_by_country_starred" . $country . $language);
}

 <?php
include_once("../model/database.php");
header('Content-Type: application/json');

$region = $_GET["region"];
$indicator = $_GET["indicator"];

$cached = get_from_cache($region, $indicator);
if ($cached !== null) {
  echo $cached;
  return;
}

$database = new DataBaseHelper();
$connection = $database->open();
$regionFilter = $region == 1 ? "" : "AND regions.un_code = $region";
$averages = $database->query($connection, "observations_by_region_avg", array($regionFilter, $indicator));
$database->close($connection);
$result = json_encode(compose_data($averages));

if (function_exists("apc_store"))
  apc_store(generate_cache_key($region, $indicator), $result);


echo $result;


/**
 * Composes the results from the DB
 * @return An array with all the results for the views.  This array can be json-encoded and sent
 */
function compose_data($averages) {
  $result = array();
  for ($i = 0; $i < count($averages); $i++) {
    $average = array(
      "average" => (float)$averages[$i]["value"],
      "time" => $averages[$i]["ref_time"],
    );
    array_push($result, $average);
  }
  return $result;
}


/**
 * Gets a pre-cached result.
 * @return The result or null if it was not cached before.
 */
function get_from_cache($region, $indicator) {
  $key = generate_cache_key($region, $indicator);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}


/**
 * Generates a unique key to store the result into the cache.
 * @return md5 hash to use as cache-key
 */
function generate_cache_key($region, $indicator) {
  return hash('md5', "observations_by_region_avg" . $region . $indicator);
}

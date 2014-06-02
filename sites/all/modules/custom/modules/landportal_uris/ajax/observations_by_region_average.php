 <?php
include_once("../model/database.php");

$region1 = $_GET["region1"];
$region2 = isset($_GET["region2"]) ? $_GET["region2"] : "";
$indicator = $_GET["indicator"];

$language = $_GET["language"];

$cached = get_from_cache($region1, $region2, $indicator);
if ($cached !== null)
  return $cached;

$database = new DataBaseHelper();
$connection = $database->open();

$regionFilter = $region1 == 1 ? "" : "AND regions.un_code = $region1";
$averages = $database->query($connection, "observations_by_region_avg", array($regionFilter, $indicator));
$result1 = compose_data($averages);

$region1Name = $database->query($connection, "continent_name", array($language, $region1))[0]["name"];

$result2 = NULL;
$region2Name = "";

if ($region2 != "") {
  $regionFilter = $region2 == 1 ? "" : "AND regions.un_code = $region2";
  $averages = $database->query($connection, "observations_by_region_avg", array($regionFilter, $indicator));
  $result2 = compose_data($averages);

  $region2Name = $database->query($connection, "continent_name", array($language, $region2))[0]["name"];
}

$database->close($connection);

if (function_exists("apc_store"))
  apc_store(generate_cache_key($region, $indicator), $result);

header('Content-Type: application/json');

echo json_encode(mergeRegions($region1, $region1Name, $result1, $region2, $region2Name, $result2));

function mergeRegions($region1, $region1Name, $regionData1, $region2, $region2Name, $regionData2) {
  $times = $regionData2 == NULL ? $regionData1["times"] :
            array_merge($regionData1["times"], $regionData2["times"]);

  $times = array_values(array_unique($times));
  asort($times);

  $series = array($region1 => array("name" => $region1Name, "values" => array()));

  $data = $regionData1["result"];

  for ($i = 0; $i < count($times); $i++) {
    $time = $times[$i];

    array_push($series[$region1]["values"], isset($data[$time]) ? $data[$time]["average"] : NULL);
  }

  if ($regionData2 != NULL) {
    $series[$region2] = array("name" => $region2Name, "values" => array());

    $data = $regionData2["result"];

    for ($i = 0; $i < count($times); $i++) {
      $time = $times[$i];

      array_push($series[$region2]["values"], isset($data[$time]) ? $data[$time]["average"] : NULL);
    }
  }

  return array("series" => $series, "times" => array_values($times));
}

/**
 * Composes the results from the DB
 * @return An array with all the results for the views.  This array can be json-encoded and sent
 */
function compose_data($averages) {
  $result = array();

  $times = array();

  for ($i = 0; $i < count($averages); $i++) {
    $time = $averages[$i]["ref_time"];

    $average = array(
      "average" => (float)$averages[$i]["value"],
      "time" => $time,
    );

    $result[$time] = $average;

    if (!array_search($time, $times))
      array_push($times, $time);
  }

  return array("result" => $result, "times" => $times);
}


/**
 * Gets a pre-cached result.
 * @return The result or null if it was not cached before.
 */
function get_from_cache($region1, $region2, $indicator) {
  $key = generate_cache_key($region1, $region2, $indicator);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}


/**
 * Generates a unique key to store the result into the cache.
 * @return md5 hash to use as cache-key
 */
function generate_cache_key($region1, $region2, $indicator) {
  return hash('md5', "observations_by_region_avg" . $region1 . $region2 . $indicator);
}

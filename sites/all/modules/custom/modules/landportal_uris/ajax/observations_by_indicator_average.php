 <?php
include_once("../model/database.php");

$indicator1 = $_GET["indicator1"];
$indicator2 = $_GET["indicator2"];

$language = $_GET["language"];

header('Content-Type: application/json');
echo observations_by_indicator_average($indicator1, $indicator2, $language);

function observations_by_indicator_average($indicator1, $indicator2, $language) {
  $cached = get_from_cache($indicator1, $indicator2);
  if ($cached !== null):
    return $cached;
  else:
    $database = new DataBaseHelper();
    $connection = $database->open();

    $regionFilter = ""; // Region Global
    $averages = $database->query($connection, "observations_by_region_avg", array($regionFilter, $indicator1));
    $result1 = compose_data($averages);

    $source1 = $database->query($connection, "indicator_source", array($indicator1));
    $source2 = $database->query($connection, "indicator_source", array($indicator2));

    $averages = $database->query($connection, "observations_by_region_avg", array($regionFilter, $indicator2));
    $result2 = compose_data($averages);

    $database->close($connection);
    $result = mergeRegions($indicator1, $result1, $source1, $indicator2, $result2, $source2);
    $json_result = json_encode($result);

    if (function_exists("apc_store"))
      apc_store(generate_cache_key($indicator1, $indicator2), $json_result);
    return $json_result;
  endif;
}





function mergeRegions($indicator1, $indicatorData1, $source1, $indicator2, $indicatorData2, $source2) {
  $times = array_merge($indicatorData1["times"], $indicatorData2["times"]);

  $times = array_values(array_unique($times));
  asort($times);

  $series = array($indicator1 => array("name" => $indicator1, "values" => array()));

  $data = $indicatorData1["result"];

  for ($i = 0; $i < count($times); $i++) {
    $time = $times[$i];

    array_push($series[$indicator1]["values"], isset($data[$time]) ? $data[$time]["average"] : NULL);
  }

  $series[$indicator2] = array("name" => $indicator2, "values" => array());

  $data = $indicatorData2["result"];

  for ($i = 0; $i < count($times); $i++) {
    $time = $times[$i];

    array_push($series[$indicator2]["values"], isset($data[$time]) ? $data[$time]["average"] : NULL);
  }

  // Sources
  $sources = array();

  $source1Organization = $source1[0]["organization_id"];
  $source1Name = $source1[0]["organization_name"];

  array_push($sources, array("id" => $source1Organization, "name" => $source1Name));

  $source2Organization = $source2[0]["organization_id"];
  $source2Name = $source2[0]["organization_name"];

  if ($source1Organization != $source2Organization)
    array_push($sources, array("id" => $source2Organization, "name" => $source2Name));

  return array("series" => $series, "times" => array_values($times), "sources" => $sources);
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
function get_from_cache($indicator1, $indicator2) {
  $key = generate_cache_key($indicator1, $indicator2);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}


/**
 * Generates a unique key to store the result into the cache.
 * @return md5 hash to use as cache-key
 */
function generate_cache_key($indicator1, $indicator2) {
  return hash('md5', "observations_by_region_avg" . $indicator1 . $indicator2);
}

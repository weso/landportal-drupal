 <?php
require_once("../model/database.php");
require_once("../helpers/observations_by_country_indicator.php");

$country1 = $_GET["country1"];
$country2 = $_GET["country2"];
$language = $_GET["language"];

header('Content-Type: application/json');
echo observations_by_country_starred($country1, $country2, $language);

function observations_by_country_starred($country1, $country2, $language){
  $cached = get_from_cache($country1, $country2, $language);
  if ($cached !== null):
    return $cached;
  else:
    $database = new DataBaseHelper();
    $connection = $database->open();
    $starred = _get_starred_indicators($database, $connection, $language);
    $result = _get_observations_by_starred($country1, $country2, $starred, $language, $connection, $database);
    $json_result = json_encode($result);
    $database->close($connection);
    if (function_exists("apc_store"))
      apc_store(generate_cache_key($country1, $country2, $language), $json_result);
    return $json_result;
  endif;
}

function _get_starred_indicators($database, $connection, $language) {
  $indicators = $database->query($connection, "starred_indicators", array($language));
  $result = array();
  for ($i = 0; $i < count($indicators); $i++):
    array_push($result, $indicators[$i]["id"]);
  endfor;
  return $result;
}


function _get_observations_by_starred($country1, $country2, $starred, $language,
    $connection, $database) {
  $result = array();
  foreach ($starred as $ind):
    $observations = get_observations_by_country_indicator($country1, $country2,
        $ind, $language, $connection, $database);
    $result[$ind] = $observations;
  endforeach;
  return $result;
}


/**
 * Fetch a value from the cache.
 * @return The value stored in cache or null if not found.
 */
function get_from_cache($country1, $country2, $language) {
  $key = generate_cache_key($country1, $country2, $language);
  if (function_exists("apc_exists") && apc_exists($key) !== false):
    return apc_fetch($key);
  endif;
  return null;
}


/**
 * Generates a unique key that can be used as a key in the cache.
 * @return md5 hash to use as key
 */
function generate_cache_key($country1, $country2, $language) {
  return hash('md5', "observations_by_country_starred" . $country1 . $country2 . $language);
}

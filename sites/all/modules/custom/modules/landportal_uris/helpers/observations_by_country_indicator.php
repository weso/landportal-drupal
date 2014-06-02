<?php
require_once("../model/database.php");

/**
 * Returns observations given two countries and one indicator.
 * @param $country1
 * @param $country2
 * @param $indicator
 * @param $language
 * @param $connection Database connection to use for the queries
 */
function get_observations_by_country_indicator($country1, $country2, $indicator,
    $language, $connection, $database) {
  $observations1 = $database->query($connection, "observations_by_country",
    array($language, $country1, $indicator));
  $result1 = _composeData($observations1);
  $observations2 = $database->query($connection, "observations_by_country",
    array($language, $country2, $indicator));
  $result2 = _composeData($observations2);
  return _mergeCountries($country1, $result1, $country2, $result2);
}


function _mergeCountries($country1, $countryData1, $country2, $countryData2) {
 $times = array_merge($countryData1["times"], $countryData2["times"]);


 $org_id = $countryData1["org_id"] ? $countryData1["org_id"] : $countryData2["org_id"];
 $org_name = $countryData1["org_name"] ? $countryData1["org_name"] : $countryData2["org_name"];

 $times = array_values(array_unique($times));
 asort($times);

 $series = array($country1 => array("name" => $countryData1["name"], "values" => array()));

 $data = $countryData1["result"];

 for ($i = 0; $i < count($times); $i++) {
   $time = $times[$i];

   $value = isset($data[$time]) ? $data[$time]["value"] : NULL;

   array_push($series[$country1]["values"], $value);
 }

 $series[$country2] = array("name" => $countryData2["name"], "values" => array());

 $data = $countryData2["result"];

 for ($i = 0; $i < count($times); $i++) {
   $time = $times[$i];

   $value = isset($data[$time]) ? $data[$time]["value"] : NULL;

   array_push($series[$country2]["values"], $value);
 }

 return array("series" => $series, "times" => array_values($times),
     "organization_id" => $org_id, "organization_name" => $org_name);
}

function _composeData($observations) {
 $result = array();

 $times = array();

 $name = "";

 // Organization ID and name is the same for all observations

 $org_id = "";
 $org_name = "";

 for ($i = 0; $i < count($observations); $i++) {
   $time = $observations[$i]["ref_time_value"];
   if ($org_id === ""):
     $org_id = $observations[$i]["organization_id"];
   endif;
   if ($org_name === ""):
     $org_name = $observations[$i]["organization_name"];
   endif;

   $name = utf8_encode($observations[$i]["country_name"]);

   $country = array(
     "faoURI" => utf8_encode($observations[$i]["faoURI"]),
     "iso2" => $observations[$i]["iso2"],
     "iso3" => $observations[$i]["iso3"],
     "name" => $name
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
       "value" => $time
     ),
     "value" => (float)$observations[$i]["value"],
     "time" => $time
   );

   $result[$time] = $observation;

   if (!array_search($time, $times))
     array_push($times, $time);
 }

 return array("result" => $result, "times" => $times, "name" => $name,
     "org_id" => $org_id, "org_name" => $org_name);
}

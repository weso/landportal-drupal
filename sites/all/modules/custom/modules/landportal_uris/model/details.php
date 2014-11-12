<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');


class Details {

  /**
   * Return the detailed info of a certain country.
   * @param $options Array containing the selected language under the variable 'language' and the
   *    API path under 'host'
   * @param $iso3 ISO3 of the country to load its detailed info.
   */
  public function get($options, $iso3) {
    $lang = $options->language;
    $api = $options->host;

    $cache = new CacheHelper('country_details', array(
      $iso3,
      $lang,
    ));
    $cached = $cache->get();
    if ($cached !== null) {
      return $cached;
    } else {
      $database = new DataBaseHelper();
      $database->open();
      $iso3 = $database->escape($iso3);
      $info = $database->query("country", array($lang, $iso3));
      $countries = $database->query("countries_without_region", array($lang));
      $topics = $database->query("topics_and_indicators_by_region", array($lang, $iso3));
      $database->close();
      $result = $this->compose_data($info, $countries, $topics);
      $cache->store($result);
      return $result;
    }
  }

  private function compose_data($info, $countries, $topics) {
    return array(
      "info" => $this->compose_info($info),
      "selectors" => array(
        "countries" => $this->compose_countries($countries)
      ),
      "topics" => $this->compose_topics($topics),
    );
  }

  private function compose_topics($data) {
    $result = array();
    for ($i = 0; $i < count($data); $i++) {
      $topic_id = $data[$i]["topic_id"];
      if (!array_key_exists($topic_id, $result)) {
        $result[$topic_id] = array(
          "id" => $topic_id,
          "name" => utf8_encode($data[$i]["topic_name"]),
          "indicators" => array(),
        );
      }
      $indicator = array(
        "id" => $data[$i]["ind_id"],
        "last_update" => $data[$i]["ind_last_update"],
        "name" => utf8_encode($data[$i]["ind_name"]),
        "description" => (isset($data[$i]["indicator_description"]) ? utf8_encode($data[$i]["indicator_description"]) : ''),
        "value" => number_format((float)$data[$i]["value"], 2, '.', ''),
        "ref_time_value" => $data[$i]["ref_time_value"],
        "source" => $data[$i]["organization_name"],
        "organization_id" => $data[$i]["organization_id"],
      );
      array_push($result[$topic_id]["indicators"], $indicator);
    }
    return array_values($result);
  }

  private function compose_info($data) {
    for ($i = 0; $i < count($data); $i++) {
      $result = array(
        "id" => $data[$i]["id"],
        "name" => utf8_encode($data[$i]["country_name"]),
        "faoURI" => utf8_encode($data[$i]["faoURI"]),
        "iso2" => $data[$i]["iso2"],
        "iso3" => $data[$i]["iso3"],
        "region" => array(
          "un_code" => $data[$i]["un_code"],
          "id" => $data[$i]["region_id"],
          "name" => utf8_encode($data[$i]["region_name"])
        )
      );
      return $result;
    }
  }

  private function compose_countries($data) {
    $result = array();
    for ($i = 0; $i < count($data); $i++) {
      $country = array(
        "id" => $data[$i]["id"],
        "name" => utf8_encode($data[$i]["country_name"]),
        "faoURI" => utf8_encode($data[$i]["faoURI"]),
        "iso2" => $data[$i]["iso2"],
        "iso3" => $data[$i]["iso3"],
      );
      array_push($result, $country);
    }
    return $result;
  }

}

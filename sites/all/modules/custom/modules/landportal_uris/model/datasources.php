<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');


class Datasources {

  public function get($options) {
    $lang = $options->language;
    $api = $options->host;

    $cache = new CacheHelper('datasources', array(
      $lang,
    ));
    $cached = $cache->get();
    if ($cached !== null) {
      return $cached;
    } else {
      $database = new DataBaseHelper();
      $database->open();
      $datasources = $database->query("organizations", array());
      $database->close();
      $result = $this->compose_data($datasources);
      $cache->store($result);
      return $result;
    }
  }

  private function compose_data($datasources) {
    return array(
      "data-sources" => $this->compose_datasources($datasources)
    );
  }

  private function compose_datasources($data) {
    $result = array();
    for ($i = 0; $i < count($data); $i++) {
      $datasource = array(
        "id" => $data[$i]["id"],
        "name" => utf8_encode($data[$i]["name"]),
        "url" => $data[$i]["url"]
      );
      array_push($result, $datasource);
    }
    return $result;
  }
}

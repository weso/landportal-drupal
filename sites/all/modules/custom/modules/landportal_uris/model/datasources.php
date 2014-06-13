<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');


class Datasources {

  public function get($options) {
    $lang = $options->language;
    $api = $options->host;

    $cached = $this->get_from_cache($lang);
    if ($cached !== null)
      return $cached;

    $database = new DataBaseHelper();
    $database->open();
    $datasources = $database->query("organizations", array());
    $database->close();
    $result = $this->compose_data($datasources);
    apc_store($this->generate_cache_key(), $result);
    return $result;
  }

  public function get_from_cache() {
    $key = $this->generate_cache_key();
    if (apc_exists($key) !== false)
      return apc_fetch($key);
    return null;
  }

  private function generate_cache_key() {
    return hash('md5', "datasources");
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

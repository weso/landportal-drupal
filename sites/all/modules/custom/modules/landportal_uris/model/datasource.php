<?php
include_once("database.php");
/*
header('Content-Type: application/json');
$adfas= new Datasource();
echo json_encode($adfas->get(array(), "undp"));
*/

class Datasource {

  public function get($options, $dat_id) {
    $lang = $options->language;
    //$lang = 'en';
    $api = $options->host;

    $cached = $this->get_from_cache($lang, $dat_id);
    if ($cached !== null)
      return $cached;

    $database = new DataBaseHelper();
    $connection = $database->open();
    $organization = $database->query($connection, "organization", array($lang, $dat_id));
    if (!$organization):
      drupal_goto("e404");
    endif;
    $indicators = $database->query($connection, "indicators_by_organization", array($lang, $dat_id));
    $organizations = $database->query($connection, "organizations", array());
    $database->close($connection);
    $result = $this->compose_data($organization, $indicators, $organizations);
    apc_store($this->generate_cache_key($lang, $dat_id), $result);
    return $result;
  }

  public function get_from_cache($lang, $dat_id) {
    $key = $this->generate_cache_key($lang, $dat_id);
    if (apc_exists($key) !== false)
      return apc_fetch($key);
    return null;
  }

  private function generate_cache_key($lang, $dat_id) {
    return hash('md5', "datasource" . $lang . $dat_id);
  }

  private function compose_data($organization, $indicators, $organizations) {
    return array(
      "info" => $this->compose_info($organization),
      "selectors" => array(
        "data-sources" => $this->compose_datasources($organizations),
        "indicators" => $this->compose_indicators($indicators),
      )
    );
  }

  private function compose_info($data) {
    return array(
      "id" => $data[0]["id"],
      "name" => utf8_encode($data[0]["name"]),
      "url" => $data[0]["url"],
      "description" => utf8_encode($data[0]["description"]),
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

  private function compose_indicators($data) {
    $result = array();
    for ($i = 0; $i < count($data); $i++) {
      $indicator = array(
        "id" => $data[$i]["id"],
        "name" => utf8_encode($data[$i]["name"]),
        "description" => utf8_encode($data[$i]["description"]),
        "format" => $data[$i]["measurement_unit"],
        "last_update" => $data[$i]["last_update"]
      );
      array_push($result, $indicator);
    }
    return $result;
  }
}

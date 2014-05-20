<?php
include_once("database.php");

class Countries {
	public function get_from_cache($lang) {
		$key = $this->generate_cache_key($lang);
		if (apc_exists($key) !== false)
			return apc_fetch($key);
		return null;
	}

	private function generate_cache_key($lang) {
		return hash('md5', "countries" . $lang);
	}

	public function get($options) {

		$lang = $options->language;
		$api = $options->host;

		$cached = $this->get_from_cache($lang);
		if ($cached !== null)
			return $cached;

		$database = new DataBaseHelper();
		$connection = $database->open();
		$countries = $database->query($connection, "countries", array($lang));
		$database->close($connection);
		$result = $this->compose_data($countries);
		apc_store($this->generate_cache_key($lang), $result);
		return $result;
	}

	private function compose_data($data) {
		$regions = array();
		$countries = array();

		for ($i = 0; $i < count($data); $i++) {
			$region_id = $data[$i]["region_id"];
			if (!array_key_exists($region_id, $regions)) {
				$regions[$region_id] = array(
					"id" => $data[$i]["region_id"],
					"name" => utf8_encode($data[$i]["region_name"]),
					"un_code" => $dta[$i]["un_code"],
					"countries" => array()
				);
			}

			$country = array(
				"id" => $data[$i]["country_id"],
				"faoURI" => utf8_encode($data[$i]["faoURI"]),
				"iso3" => $data[$i]["iso3"],
				"iso2" => $data[$i]["iso2"],
				"name" => utf8_encode($data[$i]["country_name"]),
				"data" => $data[$i]["data"] > 0
			);
			array_push($countries, $country);
			array_push($regions[$region_id]["countries"], $country);
		}
		return array("continents" => array_values($regions), "countries" => $countries);
	}
}

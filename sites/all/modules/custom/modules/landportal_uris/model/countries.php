<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');


class Countries {
	public function get($options) {
		$lang = $options->language;
		$api = $options->host;
		$cache = new CacheHelper('countries', array(
			$lang,
		));

		$cached = $cache->get();
		if ($cached !== null) {
			return $cached;
		} else {
			$database = new DataBaseHelper();
			$database->open();
			$regions_countries = $database->query("countries", array($lang));
			$countries = $database->query("countries_without_region", array($lang));
			$database->close();
			$result = $this->compose_data($regions_countries, $countries);
			$cache->store($result);
			return $result;
		}
	}

	private function compose_data($data, $conts) {
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
			array_push($regions[$region_id]["countries"], $country);
		}

		for ($i = 0; $i < count($conts); $i++) {
			array_push($countries, array(
				"id" => $conts[$i]["country_id"],
				"faoURI" => utf8_encode($conts[$i]["faoURI"]),
				"iso3" => $conts[$i]["iso3"],
				"iso2" => $conts[$i]["iso2"],
				"name" => utf8_encode($conts[$i]["country_name"]),
				"data" => $conts[$i]["data"] > 0
			));
		}
		return array("continents" => array_values($regions), "countries" => $countries);
	}
}

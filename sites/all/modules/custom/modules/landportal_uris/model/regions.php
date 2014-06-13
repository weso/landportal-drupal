<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');



class Regions {

	public function get($options, $region) {
		$lang = $options->language;
		$api = $options->host;

		$cache = new CacheHelper('regions', array(
			$lang,
		));
		$cached = $cache->get();
		if ($cached !== null) {
			return $cached;
		} else {
			$database = new DataBaseHelper();
			$database->open();
			$regions = $database->query("continents", array($lang));
			$datasources = $database->query("datasources", array($lang));
			$countries = $database->query("countries", array($lang));
			$database->close();
			$result = $this->compose_data($regions, $datasources, $countries);
			$cache->store($rseult);
			return $result;
		}
	}

	private function compose_data($regions, $datasources, $countries) {
		$res_regions = $this->compose_regions($regions);
		$res_datasources = $this->compose_datasources($datasources);
		$res_countries = $this->compose_countries($countries);
		$result = array();
		$result["selectors"] = array(
			"regions" => $res_regions,
			"data-sources" => $res_datasources,
			"countries" => $res_countries
		);
		return $result;
	}

	private function compose_regions($regions) {
		$result = array();
		for ($i = 0; $i < count($regions); $i++) {
			$region = array(
				"un_code" => $regions[$i]["continent_un_code"],
				"id" => $regions[$i]["continent_id"],
				"name" => utf8_encode($regions[$i]["continent_name"])
			);
			array_push($result, $region);
		}
		$global_reg = array(
			"un_code" => 1,
			"name" => "Global"
		);
		array_push($result, $global_reg);
		return $result;
	}

	private function compose_datasources($data) {
		$result = array();
		for ($i = 0; $i < count($data); $i++) {
			$datasource_id = $data[$i]["dat_id"];
			if (!array_key_exists($datasource_id, $result)) {
				$result[$datasource_id] = array(
					"id" => $datasource_id,
					"name" => utf8_encode($data[$i]["dat_name"]),
					"organization_id" => $data[$i]["organization_id"],
					"indicators" => array()
				);
			}
			$indicator = array(
				"id" => $data[$i]["ind_id"],
				"preferable_tendency" => $data[$i]["preferable_tendency"],
				"last_update" => $data[$i]["last_update"],
				"starred" => $data[$i]["starred"],
				"name" => utf8_encode($data[$i]["ind_name"]),
				"description" => utf8_encode($data[$i]["ind_description"])
			);
			array_push($result[$datasource_id]["indicators"], $indicator);
		}
		return array_values($result);
	}

	private function compose_countries($data) {
		$countries = array();
		for ($i = 0; $i < count($data); $i++) {
			$country = array(
				"id" => $data[$i]["country_id"],
				"faoURI" => utf8_encode($data[$i]["faoURI"]),
				"iso3" => $data[$i]["iso3"],
				"iso2" => $data[$i]["iso2"],
				"name" => utf8_encode($data[$i]["country_name"]),
			);
			array_push($countries, $country);
		}
		return $countries;
	}
}

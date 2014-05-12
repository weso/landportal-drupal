<?php

include_once('RegionList.php');

class Countries {
	public function get($options) {
		$lang = $options->language;
		$api = $options->host;

		$regionList = array();
		$fullCountryList = array();

		function sortCountries($a, $b) {
	    	if ($a->name == $b->name)
	        	return 0;

	    	return ($a->name < $b->name) ? -1 : 1;
		}

		$regionList = new RegionList();
		$regions = $regionList->getList($options);

		for ($i = 0; $i < count($regions); $i++) {
			$code = $regions[$i]->code;
			var_dump("$api/regions/$code?lang=$lang");
			$region = (array)json_decode(file_get_contents("$api/regions/$code?lang=$lang"));

			$countries = json_decode(file_get_contents("$api/regions/$code/countries?lang=$lang"));

			$fullCountryList = array_merge($fullCountryList, $countries);

			$countryList = array();

			for ($i = 0; $i < count($countries); $i++)
				$countryList[$countries[$i]->iso3] = $countries[$i];

			$countriesWithData = json_decode(file_get_contents("$api/regions/$code/countries_with_data?lang=$lang"));

			for ($i = 0; $i < count($countriesWithData); $i++)
				$countryList[$countriesWithData[$i]->iso3]->data = true;

			$countries = array();

			foreach ($countryList as $key => $value)
				array_push($countries, $value);

			usort($countries, "sortCountries");

			$region['countries'] = $countries;

			array_push($regionList, $region);
		}

		usort($fullCountryList, "sortCountries");


		return array('continents' => $regionList, 'countries' => $fullCountryList);
	}
}

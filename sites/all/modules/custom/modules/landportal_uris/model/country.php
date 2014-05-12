<?php

class Country {
	private $spiderIndicators = array('INDOECD1', 'INDIPFRI0', 'INDUNDP0');
	private $trafficLigths = array('INDOECD1', 'INDOECD8', 'INDOECD10', 'INDOECD9', 'INDOECD11');
	private $tableIndicators = array('INDWB10', 'INDWB9', 'INDWB6', 'INDWB13', 'INDWB12', 'INDWB14', 'INDWB11');

	private function cmp($a, $b) {
		return strcmp($b->ref_time->value, $a->ref_time->value);
	}
	
	private function formatValue($obj) {
		$obj->value->value = number_format((float)$obj->value->value, 2, '.', '');
		
		return $obj;
	}

	private function getLastObservation($array, $indicator) {
		usort($array, array($this, "cmp"));
		
		$i = 0;
		
		while($i < count($array)) {
			if ($array[$i]->value->value != null)
				return $this->formatValue($array[$i]);
			
			$i++;
		}
		
		if (count($array) > 0)
			return $this->formatValue($array[0]);
		else {
			null;
		}
	}
	
	private function getObservations($api, $lang, $countryCode, $array) {
		$data = array();
	
		foreach ($array as $indicator) {
			$observations = (array)json_decode(file_get_contents("$api/observations/$countryCode/$indicator?lang=$lang", false));
			
			$last = $this->getLastObservation($observations, $indicator);
			
			if ($last != null)
				array_push($data, $last);
		}
		
		return $data;
	}

	public function get($options, $countryCode) {
	
		function sortByName($a, $b) {
	    	return strcasecmp($a->name, $b->name);
		}
	
		$lang = $options->language;
		$api = $options->host;
		
		// Table indicators
	
		$spiderData = $this->getObservations($api, $lang, $countryCode, $this->spiderIndicators);
		$trafficLigthsData = $this->getObservations($api, $lang, $countryCode, $this->trafficLigths);
		$tableData = $this->getObservations($api, $lang, $countryCode, $this->tableIndicators);

		// Country info		
		
		$info = (array)json_decode(file_get_contents("$api/countries/$countryCode?lang=$lang", false));
	
		$dataSources = (array)json_decode(file_get_contents("$api/datasources?lang=$lang", false));
		$indicatorsWithData = json_decode(file_get_contents("$api/countries/$countryCode/indicators?lang=$lang", false));
		
		$indicatorsWithDataIds = array();
		foreach ($indicatorsWithData as $object) {
			$indicatorsWithDataIds[$object->id] = $object;
		}
		
		for ($i = 0; $i < count($dataSources); $i++) {
			$source = $dataSources[$i]->id;
			$indicators = (array)json_decode(file_get_contents("$api/datasources/$source/indicators?lang=$lang", false));
			
			$sourceData = false;
			
			for ($j = 0; $j < count($indicators); $j++) {
				$id = $indicators[$j]->id;
				$indicators[$j] = json_decode(file_get_contents("$api/indicators/$id?lang=$lang", false));
				
				$withData = (isset($indicatorsWithDataIds[$id]));
				$indicators[$j]->with_data = $withData;
				
				$sourceData = $sourceData || $withData;
			}
		
			usort($indicators, "sortByName");
			
			$dataSources[$i]->indicators = $indicators;
			$dataSources[$i]->with_data = $sourceData;
		}
		
		$countries = json_decode(file_get_contents("$api/countries?lang=$lang", false));
		
		usort($dataSources, "sortByName");
		usort($countries, "sortByName");

		$starredIndicators = (array)json_decode(file_get_contents("$api/indicators/starred?lang=$lang", false));
	
		return array(
				'info' => $info,
				'selectors' =>
					array('data-sources' => $dataSources, 'countries' => $countries),
				'starred' => $starredIndicators,
				'charts' => array(
						'spider' => array('observations' => $spiderData),
						'trafficLights' => array('observations' => $trafficLigthsData),
						'tableIndicators' => array('observations' => $tableData)
					)
				);
	}
}
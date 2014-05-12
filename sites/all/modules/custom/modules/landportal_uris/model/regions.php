<?php

include_once('RegionList.php');

class Regions {
	public function get($options, $region) {

		function sortByName($a, $b) {
	    	return strcasecmp($a->name, $b->name);
		}

		$lang = $options->language;
		$api = $options->host;

		$regionList = new RegionList();
		$regions = $regionList->getList($options);

		$dataSources = (array)json_decode(file_get_contents("$api/datasources?lang=$lang"));

		for ($i = 0; $i < count($dataSources); $i++) {
			$source = $dataSources[$i]->id;
			$indicators = json_decode(file_get_contents("$api/datasources/$source/indicators?lang=$lang"));

			for ($j = 0; $j < count($indicators); $j++) {
				$id = $indicators[$j]->id;
				$indicators[$j] = json_decode(file_get_contents("$api/indicators/$id?lang=$lang"));
			}

			usort($indicators, "sortByName");

			$dataSources[$i]->indicators = $indicators;
		}

		$countries = json_decode(file_get_contents("$api/countries?lang=$lang"));

		usort($dataSources, "sortByName");
		usort($countries, "sortByName");

		return array(
				'selectors' =>
					array('regions' => $regions, 'data-sources' => $dataSources, 'countries' => $countries)
				);
	}
}

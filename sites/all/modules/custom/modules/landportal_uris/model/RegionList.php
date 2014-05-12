<?php
	
final class RegionList {
    public function getList($options) {
	    $lang = $options->language;
		$api = $options->host;
		
		$regions = (array)json_decode(file_get_contents("$api/regions/1/regions?lang=$lang"));
		
		array_push($regions, array(
			'name' => 'Global',
			'un_code' => 1
		));
		
		return $regions;
    }
}
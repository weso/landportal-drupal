<?php

class Country {
	
	public function get($iso3) {
		$file = file_get_contents(drupal_get_path('module', 'landportal_uris').'/model/country.json');
		return json_decode($file, true);
	}
	
}
<?php

class Country {
	
	/**
	 * Get the required info of a Country. Returns false if the country does not
	 * exist.
	 *
	 * @param $iso3 ISO3 code of the required country.
	 * @return Associative array containing the country info if the country
	 * 		exists. False if the country does not exist.
	 */
	public function get($iso3) {
		$temporal_country = 'country';
        $file_path = drupal_get_path("module", "landportal_uris") . "/model/" . $temporal_country . ".json";
        // Check if the country exists
        if (file_exists($file_path)) {
            $file_data = file_get_contents($file_path);
            $country_data = json_decode($file_data, true);
            $country_data['entity-id'] = $iso3;
            return $country_data;
        } else {
            return false;
        }
	}
    
}
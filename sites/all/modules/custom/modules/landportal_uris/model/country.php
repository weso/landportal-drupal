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
        $module_path = drupal_get_path("module", "landportal_uris");
        $country_path = $module_path . "/model/" . $temporal_country . ".json";
        // Check if the country exists
        if (file_exists($country_path)) {
            $country_data = file_get_contents($country_path);
            return json_decode($country_data, true);
        } else {
            return false;
        }
	}
    
}
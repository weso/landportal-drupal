<?php

class Region {
	
	public function get($region_id) {
        $temporal_region = 'region';
        $module_path = drupal_get_path("module", "landportal_uris");
        $region_path = $module_path . "/model/" . $temporal_region . ".json";
        // Check if the indicator exists
        if (file_exists($region_path)) {
            $region_data = file_get_contents($region_path);
            return json_decode($region_data, true);
        } else {
            return false;
        }
	}
    
}
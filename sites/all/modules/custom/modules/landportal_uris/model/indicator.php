<?php

class Indicator {
	
	public function get($indicator_id) {
        $module_path = drupal_get_path("module", "landportal_uris");
        $ind_path = $module_path . "/model/" . $indicator_id . ".json";
        // Check if the indicator exists
        if (file_exists($ind_path)) {
            $ind_data = file_get_contents($ind_path);
            return json_decode($ind_data, true);
        } else {
            return false;
        }
	}
    
}
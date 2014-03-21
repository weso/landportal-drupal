<?php

class Region {
	
	public function get($region_id) {
        $temporal_region = 'region';
        $file_path = drupal_get_path("module", "landportal_uris") . "/model/" . $temporal_region . ".json";
        
        if (file_exists($file_path)) {
            $file_data = file_get_contents($file_path);
            $region_data = json_decode($file_data, true);
            $region_data['entity-id'] = $region_id;
            return $region_data;
        } else {
            return false;
        }
	}
    
}
<?php

class Indicator {
	
	public function get($indicator_id) {
        $temporal_indicator = 'indicator';
        $file_path = drupal_get_path("module", "landportal_uris") . "/model/" . $temporal_indicator . ".json";

        if (file_exists($file_path)) {
            $file_data = file_get_contents($file_path);
            $indicator_data = json_decode($file_data, true);
            $indicator_data['entity-id'] = $indicator_id;
            return $indicator_data;
        } else {
            return false;
        }
	}
    
}
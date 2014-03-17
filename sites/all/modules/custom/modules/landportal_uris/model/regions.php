<?php

class Regions {
	
	public function get() {
		$module_path = drupal_get_path("module", "landportal_uris");
        $model_path = $module_path . "/model/regions.json";
        $regions_data = file_get_contents($model_path);
        return json_decode($regions_data, true);
	}
}
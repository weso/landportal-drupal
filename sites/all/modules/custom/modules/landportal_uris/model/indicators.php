<?php

class Indicators {
	
	public function get() {
		$module_path = drupal_get_path("module", "landportal_uris");
        $model_path = $module_path . "/model/indicators.json";
        $indicators_data = file_get_contents($model_path);
        return json_decode($indicators_data, true);
	}
}
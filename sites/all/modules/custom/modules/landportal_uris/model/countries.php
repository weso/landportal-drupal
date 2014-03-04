<?php

class Countries {
	
	public function get() {
		$module_path = drupal_get_path("module", "landportal_uris");
        $model_path = $module_path . "/model/countries.json";
        $countries_data = file_get_contents($model_path);
        return json_decode($countries_data, true);
	}
}
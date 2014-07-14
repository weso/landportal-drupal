<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');
require_once(dirname(__FILE__) .'/countries.php');
require_once(dirname(__FILE__) .'/indicators.php');

class Sitemap {
	
	public function get($options) {
		$countries = new Countries();
		$indicators = new Indicators();
		return array(
			"countries" => $countries->get($options),
			"indicators" => $indicators->get($options),
		);
	}

}
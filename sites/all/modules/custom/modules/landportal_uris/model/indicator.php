<?php
include_once("database.php");
include_once("indicators.php");

class Indicator {
	public function get($options) {
		$indicators = new Indicators();
		$result = $indicators->get($options);
		return array(
			"selectors" => array(
					"topics" => $result["topics"],
					"indicators"=> $result["indicators"]
			)
		);
	}
}

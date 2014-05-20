<?php
include_once("database.php");

class Indicators {
	public function get_from_cache($lang) {
		$key = $this->generate_cache_key($lang);
		if (apc_exists($key) !== false)
			return apc_fetch($key);
		return null;
	}

	private function generate_cache_key($lang) {
		return hash('md5', "indicators" . $lang);
	}

	public function get($options) {

		$lang = $options->language;
		$api = $options->host;

		$cached = $this->get_from_cache($lang);
		if ($cached !== null)
			return $cached;

		$database = new DataBaseHelper();
		$connection = $database->open();
		$topics = $database->query($connection, "topics", array($lang));
		$database->close($connection);
		$result = $this->compose_data($topics);
		apc_store($this->generate_cache_key($lang), $result);
		return $result;
	}

	private function compose_data($data) {
		$topics = array();
		$indicators = array();

		for ($i = 0; $i < count($data); $i++) {
			$topic_id = $data[$i]["topic_id"];
			if (!array_key_exists($topic_id, $topics)) {
				$topics[$topic_id] = array(
					"id" => $data[$i]["topic_id"],
					"translation_name" => utf8_encode($data[$i]["topic_name"]),
					"indicators" => array()
				);
			}

			$indicator = array(
				"id" => $data[$i]["indicator_id"],
				"preferable_tendency" => $data[$i]["preferable_tendency"],
				"last_update" => $data[$i]["last_update"],
				"starred" => $data[$i]["starred"],
				"name" => utf8_encode($data[$i]["indicator_name"]),
				"description" => utf8_encode($data[$i]["indicator_description"])
			);
			array_push($indicators, $indicator);
			array_push($topics[$topic_id]["indicators"], $indicator);
		}
		return array("topics" => array_values($topics), "indicators" => $indicators);
	}
}

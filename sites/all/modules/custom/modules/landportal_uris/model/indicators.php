<?php
require_once(dirname(__FILE__) .'/../database/database_helper.php');
require_once(dirname(__FILE__) .'/../cache/cache_helper.php');



class Indicators {

	public function get($options) {
		$lang = $options->language;
		$api = $options->host;

		$cache = new CacheHelper('indicators', array(
			$lang,
		));
		$cached = $cache->get();
		if ($cached !== null) {
			return $cached;
		} else {
			$database = new DataBaseHelper();
			$database->open();
			$topics = $database->query("topics", array($lang));
			$indicators = $database->query("indicators", array($lang));
			$database->close();
			$result = $this->compose_data($topics, $indicators);
			$cache->store($result);
			return $result;
		}
	}

	private function compose_data($data, $inds) {
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
			array_push($topics[$topic_id]["indicators"], $indicator);
		}

		for ($i = 0; $i < count($inds); $i++) {
			array_push($indicators, array(
				"id" => $inds[$i]["indicator_id"],
				"preferable_tendency" => $inds[$i]["preferable_tendency"],
				"last_update" => $inds[$i]["last_update"],
				"starred" => $inds[$i]["starred"],
				"name" => utf8_encode($inds[$i]["indicator_name"]),
				"description" => utf8_encode($inds[$i]["indicator_description"])
			));
		}
		return array("topics" => array_values($topics), "indicators" => $indicators);
	}
}

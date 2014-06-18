<?php


class Home {
    public function get($options) {
    	$language = $options->language;
        $config_file = file_get_contents(dirname(__FILE__) .'/../home.json');
        $config = (array)json_decode($config_file, true);

        $count = 0;
        $result = array();
        foreach ($config as $item) {
        	$count++;
        	array_push($result, array(
        		"image" => $item["image"],
        		"text" => $item["text"][$language],
                "url" => $item["url"]
    		));
    		if ($count == 4) {
    			break;
    		}
        }

        return array('carousel' => $result);
    }
}

<?php
class Indicators {
	public function get($options) {
	
		$lang = $options->language;
		$api = $options->host;
	
		$topics = (array)json_decode(file_get_contents("$api/topics?lang=$lang"));
		
		$indicators = array();
		
		function sortIndicators($a, $b) {
	    	if ($a->name == $b->name)
	        	return 0;
	    
	    	return ($a->name < $b->name) ? -1 : 1;
		}	
		
		for ($i = 0; $i < count($topics); $i++) {
			$id = $topics[$i]->id;
			
			$_indicators = json_decode(file_get_contents("$api/topics/$id/indicators?lang=$lang"));
			
			$topics[$i]->indicators = $_indicators;
			
			$indicators = array_merge($indicators, $_indicators);
		}
		
		usort($indicators, "sortIndicators");	
		
		return array('topics' => $topics, 'indicators' => $indicators);
	}
}
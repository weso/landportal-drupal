<?php
	
	function custom_preprocess_page(&$vars) {
		$vars['mustache_template'] = 'index';
		$vars['mustache_data'] = array("planet" => "World!");
		
		/*
		if (isset($vars['node'])) {
			if ($vars['node']->type == 'country') {
				$vars['mustache_data'] = "{'planet': 'country'}";
			} elseif ($vars['node']->type == 'book') {
				$vars['mustache_data'] = "{planet: World!}";
			}
		}
		*/
	}
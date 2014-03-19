<?php

class Catalog {
	
	public function get() {
		$ckan_view = file_get_contents('http://localhost:1100/data');
		$data = array('ckan' => $ckan_view);
        return $data;
	}
}
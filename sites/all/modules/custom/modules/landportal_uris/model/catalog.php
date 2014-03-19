<?php

class Catalog {
	
	public function get() {
		$ckan_view = file_get_contents('http://156.35.82.103/data');
		$data = array('ckan' => $ckan_view);
        return $data;
	}
}
<?php

class Reuse {
	public function get($options) {

		$lang = $options->language;
		$api = $options->host;
		$sparql = $options->sparql;
		$querystring = $options->querystring;

		$namespace = isset($querystring['default-graph-uri']) ? $querystring['default-graph-uri'] : 'http://book.landportal.org';
		$query = isset($querystring['query']) ? $querystring['query'] : '';
		$format = isset($querystring['format']) ? $querystring['format'] : '';

		$language = '';

		switch($format) {
			case 'text/html':
					$language = 'html';
					break;
			case 'application/vnd.ms-excel':
					$language = 'html';
					break;
			case 'application/sparql-results+xml':
					$language = 'xml';
					break;
			case 'json':
					$language = 'js';
					break;
			case 'application/javascript':
					$language = 'js';
					break;
			case 'text/plain':
					$language = 'xml';
					break;
			case 'application/rdf+xml':
					$language = 'xml';
					break;
			default:
					$language = 'html';
					break;
		}

		$result = '';
		$html = '';

		if ($query != '') {
			$query = urlencode($query);

			$url = "$sparql?default-graph-uri=$namespace&query=$query&format=$format";
			$result = file_get_contents($url);

			$url = "$sparql?default-graph-uri=$namespace&query=$query&format=text/html";
			$html = file_get_contents($url);

			//$html = str_replace('border="1"', 'border="0"', $html);
		}
		else
			$query = 'select distinct ?indicator where {[] a ?indicator} LIMIT 100';

		return array(
			'result' => $result,
			'html' => $html,
			'language' => $language,
			'query' => urldecode($query),
			'namespace' => $namespace
		);
	}
}

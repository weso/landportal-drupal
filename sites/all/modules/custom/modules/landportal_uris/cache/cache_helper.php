<?php


class CacheHelper {

	private $hash_algorithm = 'md5';
	private $key;

	/**
	 * @param $name Name of the service calling the cache.  Used to avoid collisions.
	 * @param $params Array with the parameters to compose the key.
	 */
	function __construct($name, $params) {
		$this->key = hash($this->hash_algorithm, $name . implode($params));
	}

	/**
	 * Gets the value stored in the cache
	 */
	public function get() {
		if (function_exists('apc_exists') && apc_exists($this->key)) {
			return apc_fetch($this->key);
		} else {
			return null;
		}
	}

	/**
	 * Store a value in the cache
	 */
	public function store($value) {
		if (function_exists('apc_store')) {
			apc_store($this->key, $value);
		}
	}
}
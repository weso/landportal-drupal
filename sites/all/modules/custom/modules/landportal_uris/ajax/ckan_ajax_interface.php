<?php
// Display errors for demo
@ini_set('error_reporting', E_ALL);
@ini_set('display_errors', 'stdout');

// Include Ckan_client
require_once('./ckan_client.php');

// Create CKAN object
// Takes optional API key parameter. Required for POST and PUT methods.
$ckan = new CkanClient('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

if (isset($_POST['functionname'])) {
	
	// Check is the function is on the cache
	$cached = get_from_cache($_POST['functionname'], implode($_POST['arguments']));
	if ($cached !== null) {
		print $cached;
	} else {
		switch ($_POST['functionname']) {
			case 'get_package':
				$package_id = $_POST['arguments'][0];
					
				print json_encode($ckan->get_package_entity($package_id));
				break;
			case 'get_packages':
				$limit = FALSE;
				$offset = FALSE;
				
				if (isset($_POST['arguments'])) {
					$limit = $_POST['arguments'][0];
					$offset = $_POST['arguments'][1];
				}
				
				$result = $ckan->get_package_list($limit, $offset);
				break;
			case 'get_full_packages':
				$limit = FALSE;
				$offset = FALSE;
					
				if (isset($_POST['arguments'])) {
					$limit = $_POST['arguments'][0];
					$offset = $_POST['arguments'][1];
				}
				
				$result = $ckan->get_full_package_list($limit, $offset);
				break;
			case 'get_groups':
				$order_by = FALSE;
				$sort = FALSE;
				$groups = FALSE;
				$all_fields = FALSE;
				
				if (isset($_POST['arguments'])) {
					$order_by = $_POST['arguments'][0];
					$sort = $_POST['arguments'][1];
					$groups = $_POST['arguments'][2];
					$all_fields = $_POST['arguments'][3];
				}
				
				print json_encode($ckan->get_group_register($order_by, $sort, $groups, $all_fields));
				break;
			case 'get_group':
				$group_id = $_POST['arguments'][0];
				
				print json_encode($ckan->get_group_entity($group_id));
				break;
			case 'get_group_packages':
				$group_id = $_POST['arguments'][0];
				$result = $ckan->get_group_packages($group_id);
				break;
			case 'get_organization_packages':
				$organization_id = $_POST['arguments'][0];
				$result = $ckan->get_organization_packages($organization_id);
				break;
			case 'get_tags':
				$query = FALSE;
				$vocabulary_id = FALSE;
				$all_fields = FALSE;
				
				if(isset($_POST['arguments'][0])) {
					$query = $_POST['arguments'][0];
				}
				if(isset($_POST['arguments'][1])) {
					$vocabulary_id = $_POST['arguments'][1];
				}
				if(isset($_POST['arguments'][2])) {
					$all_fields = $_POST['arguments'][2];
				}
				
				print json_encode($ckan->get_tag_register($query, $vocabulary_id, $all_fields));
				break;
			case 'get_tag':
				$tag_id = $_POST['arguments'][0];
				
				print json_encode($ckan->get_tag_entity($tag_id));
				break;
			case 'get_tag_packages':
				$tag_id = $_POST['arguments'][0];
				$result = $ckan->get_tag_packages($tag_id);
				break;
			case 'get_licenses':
				print json_encode($ckan->get_license_list());
				break;
			case 'search_packages':
				$keywords = $_POST['arguments'][0];
				$result = $ckan->search_package($keywords);
				break;
			default:
				$result = array();
				$result['error'] = "Not found function " . $_POST['functionname'] . '!';
				//print json_encode($errorResult);
			break;
		}
		try {
			if (function_exists("apc_store")) {
				apc_store(generate_cache_key($_POST['functionname'], implode($_POST['arguments']), $result));
			}

			print json_encode($result);
		} catch(Exception $e) {
			print $result;
		}
	}
} else {
	print 'This is a php interface for AJAX calls, please, use it properly';
}

/**
 * Gets a pre-cached result.
 * @return The result or null if it was not cached before.
 */
function get_from_cache($function, $arguments) {
  $key = generate_cache_key($function, $arguments);
  if (function_exists("apc_exists") && apc_exists($key) !== false)
    return apc_fetch($key);
  return null;
}


/**
 * Generates a unique key to store the result into the cache.
 * @return md5 hash to use as cache-key
 */
function generate_cache_key($function, $arguments) {
    return hash('md5', "ckan-data"
        . $function
        . $arguments
    );
}
?>
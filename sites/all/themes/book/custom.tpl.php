<?php

/*
At this point THE FOLLOWING VARIABLES ARE AVAILABLE:
	- $application_data: contains the application data required to render the
	  views such as:
		- the current user name
		- the list of all available languages with ISO2 code, language name, and
		  a selected attribute in the selected language
		- the ISO2 code of the selected language
	- $theme_path: contains the full path of the theme root folder.
	- $mustache_data: contains all the data required to render the views
	- $mustache_template: contains the name of the template to load
	- $mustache_navigation: contains the name of the upper level of navigation
*/

$mustache = get_mustache('views', 'views/partials');
// The template to use comes from the model.
$template = $mustache->loadTemplate($mustache_template);
// The basic data to render the template comes from the model.
$data = get_template_data($mustache_data, $mustache_template, $mustache_navigation, $application_data, $theme_path);
//Render the selected template with the required data.
echo $template->render($data);


/**
 * Get the labels for the specified language.
 * 
 * @param $languages Associative array containing all the available languages
 *	and the selected.
 * @return associative array with the labels parsed from the JSON file.
 */
function get_labels($languages) {
	foreach ($languages as $lang) {
		if ($lang['selected'] === true) {
			$selected = $lang['code'];
			break;
		}
	}
	// Set the language in the session
	$_SESSION['language'] = $selected;
	// Load the labels
	$theme_path = drupal_get_path('theme', 'book');
	$labels_path = $theme_path . '/lang/' . $selected . '.json';
	$labels = json_decode(file_get_contents($labels_path), true);
	return $labels;
}


/**
 * Get the required JavaScript files for a certain view.
 *
 * @param $name The name of the template to load its JS files. The files are looked
 *	for in the /js/$name.js file.
 * @return Array containing the full URLs of the required JS files, if the files
 * 	do not exist the returned array will be empty.
 */
function get_js($name) {
	$js_path = drupal_get_path('theme', 'book') . '/js/controller/' . $name . '.js';
	if (file_exists($js_path)) {
		return array("script" => 'http://' . $_SERVER['HTTP_HOST'] . '/' . $js_path);
	} else {
		return array();
	}
}


/**
 * Get the Mustache object.
 *
 * @param $views_path The folder in which the Mustache object will look for the
 *	views.
 * @param $partials_path The folder in which the Mustache object will look for the
 *	partials.
 * @return A Mustache object.
 */
function get_mustache($views_path, $partials_path) {
	require libraries_get_path('Mustache') . '/Autoloader.php';
	$theme_path = drupal_get_path('theme', 'book');

	Mustache_Autoloader::register();
	$mustache = new Mustache_Engine(array(
		'loader' => new Mustache_Loader_FilesystemLoader($theme_path . '/' . $views_path),
		'partials_loader' => new Mustache_Loader_FilesystemLoader($theme_path . '/' . $partials_path),
	));
	return $mustache;
}


/**
 * Get the required data to render the template.
 *
 * @param $mustache_data Model data.
 * @param $mustache_template The name of the template to render
 * @param $mustache_navigation The tab corresponding to the upper level navigation
 * @param $application_data Application data containing the availble languages and the current user
 * @param $theme_path Full path of the theme, used in some links of the views
 *
 * @return Array with the data to render the template.
 */
function get_template_data($mustache_data, $mustache_template, $mustache_navigation, $application_data, $theme_path) {
	// The data to render the template comes from the model.
	$data = $mustache_data;
	// Append the application data
	$data['application'] = $application_data;
	$data['application']['navigation'][$mustache_navigation] = $mustache_navigation;
	// Get the language and append the labels to the data to render the template.
	$data['labels'] = get_labels($application_data['languages']);
	// Get the required JavaScript files that will be passed to the template
	$data['scripts'] = get_js($mustache_template);
	// Get the absolute path to the theme. It is required in some templates.
	$data['path'] = $theme_path;

	return $data;
}

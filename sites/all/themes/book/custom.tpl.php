<?php

$mustache = get_mustache('views', 'views/partials');
// The template to use comes from the model.
$template = $mustache->loadTemplate($mustache_template);
// The basic data to render the template comes from the model.
$data = get_template_data($mustache_data, $mustache_template, $application_data, $theme_path);
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
	$js_path = drupal_get_path('theme', 'book') . '/js/' . $name . '.js';
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
 * @param $languages List of available languages to render the template in.
 * @param $default_lang Default language to render the template.
 * @param $mustache_template The name of the template to render
 * @return Array with the data to render the template.
 */
function get_template_data($mustache_data, $mustache_template, $application_data, $theme_path) {
	// The data to render the template comes from the model.
	$data = $mustache_data;
	// Append the application data
	$data['application'] = $application_data;
	// Get the language and append the labels to the data to render the template.
	$data['labels'] = get_labels($application_data['languages']);
	// Get the required JavaScript files that will be passed to the template
	$data['scripts'] = get_js($mustache_template);
	// Get the absolute path to the theme. It is required in some templates.
	$data['path'] = $theme_path;

	return $data;
}

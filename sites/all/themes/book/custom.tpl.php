<?php

$languages = array('en', 'es', 'fr');
$mustache = get_mustache('views', 'views/partials');
// The template to use comes from the model.
$template = $mustache->loadTemplate($mustache_template);
// The basic data to render the template comes from the model.
$data = get_template_data($mustache_data, $languages, 'en');
//Render the selected template with the required data.
echo $template->render($data);

/**
 * Get the language to show the template.
 *
 * @param $languages Array with the available languages.
 * @param $default Default language to show the template in. Must be present into
 *	the available languages.
 * @return The language in which the template must be shown depending on the user
 *	preferences.
 */
function get_language($languages, $default) {
	// Add current language
	$language = isset($_GET['language']) ? $_GET['language'] : '';
	if (empty($language) && isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
		$language =  substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	}
	if (empty($language) || !in_array($language, $languages))
		$language = $default;
	return $language;
}

/**
 * Get the labels for the specified language.
 * 
 * @param $language the language to load its labels. The labels are parsed
 *	from the /lang/$language.json file.
 * @return associative array with the labels parsed from the JSON file.
 */
function get_labels($language) {
	$theme_path = drupal_get_path('theme', 'book');
	$labels_path = $theme_path . '/lang/' . $language . '.json';
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
 * Get the full theme path.
 *
 * @return The full theme path.
 */
function get_path() {
	$server_name = $_SERVER['HTTP_HOST'];
	$theme_path = drupal_get_path('theme', 'book');
	return 'http://' . $server_name . '/' . $theme_path;
}

/**
 * Get the required data to render the template.
 *
 * @param $mustache_data Model data.
 * @param $languages List of available languages to render the template in.
 * @param $default_lang Default language to render the template.
 * @return Array with the data to render the template.
 */
function get_template_data($mustache_data, $languages, $default_lang) {
	// The data to render the template comes from the model.
	$data = $mustache_data;
	// Get the language and append the labels to the data to render the template.
	$language = get_language($languages, $default_lang);
	$data['labels'] = get_labels($language);
	// Get the required JavaScript files that will be passed to the template
	$data['scripts'] = get_js($mustache_template);
	// Get the absolute path to the theme. It is required in some templates.
	$data['path'] = get_path();

	return $data;
}

<?php
// Available languages
$languages = array('en', 'es', 'fr');

// Mustache loader
require libraries_get_path('Mustache') . '/Autoloader.php';
Mustache_Autoloader::register();

// Create Mustache engine
$mustache = new Mustache_Engine(array(
	'loader' => new Mustache_Loader_FilesystemLoader(drupal_get_path('theme', 'book') . '/views'),
	'partials_loader' => new Mustache_Loader_FilesystemLoader(drupal_get_path('theme', 'book') . '/views/partials'),
));

// Get the template to use.
// The template is passed from the Landportal_uris module and
// it is defined by name-convention in the file routes.json of such module.
$template = $mustache->loadTemplate($mustache_template);
// Get the data to show
// The data is passed from the Landportal_uris module and comes from
// the model classes, also uses name-convention.
$data = $mustache_data;
// Load selected language labels. The labels also use name-convention
$language = getLanguage($languages, 'en');
$lang_path = drupal_get_path('theme', 'book').'/lang/'.$language.'.json';
$labels = json_decode(file_get_contents($lang_path), true);
$data['labels'] = $labels;
// Load the required js files, name-convention
$data['scripts'] = get_js($mustache_template);
$data['path'] = 'http://' . $_SERVER['HTTP_HOST'] . '/' . drupal_get_path('theme', 'book');

$data['data_str'] = $mustache_data_str;

//Render the selected template with the required data.
echo $template->render($data);

/**
 * Get the language to show the template in.
 * It checks first if the langugage=xx parameter in the URL
 * If it is not present the browser preferences are checked
 * If neither are present, or are outside the available languages
 * returns the default.
 */
function getLanguage($languages, $default) {
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
 * Returns an array containing the required js files for a certain template.
 * If the files do not exist, the returned array will be empty.
 */
function get_js($name) {
	$js_path = drupal_get_path('theme', 'book') . '/js/' . $name . '.js';
	if (file_exists($js_path)) {
		return array("script" => 'http://' . $_SERVER['HTTP_HOST'] . '/' . $js_path);
	} else {
		return array();
	}
}


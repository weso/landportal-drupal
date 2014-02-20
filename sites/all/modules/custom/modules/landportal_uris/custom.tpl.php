<?php

// Mustache loader
$mustache_path = libraries_get_path('Mustache') . '/Autoloader.php';
require $mustache_path;
Mustache_Autoloader::register();

// Create Mustache engine
$mustache = new Mustache_Engine(array(
	'loader' => new Mustache_Loader_FilesystemLoader(drupal_get_path('theme', 'mustache') . '/views')
));

// Read data from JSON file
$data = $mustache_data;
// Mundo view template
$template = $mustache->loadTemplate($mustache_template);

echo $template->render($data);

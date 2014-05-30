<?php
$_server_name = $_SERVER['HTTP_HOST'];

/**
 * Configuration for the 'Book' theme.
 */
$config = array(
  "server_name" => $server_name,
  "api" => "http://{$server_name}/". drupal_get_path("module", "landportal_uris") . "/ajax",
  "sparql" => "http://{$server_name}/sparql",
  "api-widgets" => "http://{$server_name}/api",
  "theme_path" => "http://{$server_name}/". $_book_theme_path = drupal_get_path("theme", "book"),
);

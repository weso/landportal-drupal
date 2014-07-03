<?php
require_once("mustache.php");

function get_template($mustache_template, $mustache_navigation, $application_data, $theme_path) {
  render_mustache(array(), $mustache_template, $mustache_navigation, $application_data, $theme_path);
}

function get_partial($mustache_template, $mustache_navigation, $application_data, $theme_path) {
  render_partial(array(), $mustache_template, $mustache_navigation, $application_data, $theme_path);
}

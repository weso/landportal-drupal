<?php

/**
 * Implements hook_theme()
 */
function book_theme() {
  $items = array();

  $items['book'] = array(
    'path' => drupal_get_path('theme', 'book'),
    'template' => 'custom',
    'variables' => array('mustache_data' => NULL, 'mustache_template' => NULL),
  );

  $items['404'] = array(
    'path' => drupal_get_path('theme', 'book'),
    'template' => '404',
    'variables' => array(),
  );

  return $items;
}

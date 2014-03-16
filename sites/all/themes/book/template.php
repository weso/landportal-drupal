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
    'template' => 'custom',
    'variables' => array('mustache_data' => NULL, 'mustache_template' => 'err404'),
  );

  return $items;
}

function book_preprocess(&$variables) {
  $appdata = array();
  $appdata['languages'] = _get_available_languages();
  $user = _get_current_user();
  if (!is_null($user))
    $appdata['user'] = $user;
  $variables['application'] = $appdata;
}

/**
 * Returns an associative array containing the available languages and its
 * name.
 */
function _get_available_languages() {
  $result = array();
  $lang_folder = drupal_get_path('theme', 'book') . '/lang/';
  $files = new DirectoryIterator($lang_folder);
  foreach ($files as $file) {
    // Exclude '.' and '..' files
    if ($file->isFile()) {
      // Filename without extension
      $filename = $file->getBasename('.' . $file->getExtension());
      $filecontent = json_decode(file_get_contents($file->getPathname()), true);
      $result[$filename] = $filecontent['language-name'];
    }
  }
  return $result;
}

/**
 * Returns an associative array containing the current user name.
 * If there is no user, returns NULL
 */
function _get_current_user() {
  global $user;
  if (!isset($user->name)) {
    return NULL;
  } else {
    return array('name' => $user->name);
  }
}
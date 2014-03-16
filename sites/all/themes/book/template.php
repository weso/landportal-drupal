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

/**
 * Adds the application data required by all the templates. The application 
 * data includes a list of the available languages and the current user name.
 */
function book_preprocess(&$variables) {
  $appdata = array();
  $appdata['languages'] = _get_languages('en');
  $user = _get_current_user();
  if (!is_null($user))
    $appdata['user'] = $user;
  $variables['application_data'] = $appdata;
}

/**
 * Get a list with all the available languages.
 *
 * @param $default Default language to use
 * @return An associative array which keys are the ISO2 code of the available
 * languages and which contais the language name under the attribute
 * 'language' and the selected langauge under the attribute 'selected'
 */
function _get_languages($default) {
  $languages = _get_available_languages();
  // Get the selected language
  $selected = isset($_GET["language"]) ? $_GET["language"] : "";
  if (empty($selected) && isset($_SESSION["language"])) {
    $selected = $_SESSION["language"];
  } elseif (empty($selected) && isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
    $selected = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  }
  // If none of them was present, or the language is not recognized fallback
  // to default (english). 
  if (empty($selected) || !in_array($selected, array_keys($languages)))
      $selected = $default;
  // Store the choosen language in session
  $_SESSION['language'] = $selected;
  $languages[$selected]['selected'] = true;
  return $languages;
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
      $result[$filename]['language'] = $filecontent['language-name'];
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
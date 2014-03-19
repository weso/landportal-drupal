<?php

/**
 * Implements hook_theme()
 */
function book_theme() {
  $items = array();

  $items['book'] = array(
    'path' => drupal_get_path('theme', 'book'),
    'template' => 'custom',
    'variables' => array('mustache_data' => NULL, 'mustache_template' => NULL, 'mustache_navigation' => NULL),
  );

  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'book'),
    'template' => 'custom',
    'variables' => array('mustache_data' => NULL, 'mustache_template' => 'login', 'mustache_navigation' => NULL),
  );

  return $items;
}


/**
 * Implements hook_preprocess.
 * Sets variables required by all the templates. Those variables are:
 *  - $application_data: contains common application data required by all the
 *    templates including the list of available languages and the current user name
 *  - $theme_path: the full path to the theme folder. Used to load some static resources
 */
function book_preprocess(&$variables) {
  $variables['application_data'] = get_application_data();
  $variables['theme_path'] = get_path();
}


/**
 * Implements hook_preprocess_html.
 * In this case preprocess the HTML to add a link to the <head> corresponding
 * to the Google fonts.
 */
function book_preprocess_html(&$vars) {
  $googlefonts = array(
    '#tag' => 'link', // The #tag is the html tag - <link />
    '#attributes' => array( // Set up an array of attributes inside the tag
      'href' => 'http://fonts.googleapis.com/css?family=News+Cycle|Source+Sans+Pro:300,400', 
      'rel' => 'stylesheet',
      'type' => 'text/css',
    ),
  );
  drupal_add_html_head($googlefonts, 'googlefonts');

}


/**
 * Get the application data required by all the templates. 
 * 
 * @return a list of the available and selected langauges and the current user name (if
 *  it exists.
 */
function get_application_data() {
  $appdata = array();
  $languages = get_languages('en');
  $selected_lang = get_selected_language($languages);
  $user = _get_current_user();

  $appdata['languages'] = $languages;
  $appdata['language'] = $selected_lang;
  $appdata['user'] = $user;
  return $appdata;
}

/**
 * Get a list with the available languages and the selected language marked.
 *
 * @param $default Default language to use
 * @return An associative array which keys are the ISO2 code of the available
 * languages and which contais the language name under the attribute
 * 'language' and the selected langauge under the attribute 'selected'
 */
function get_languages($default) {
  $languages = _get_available_languages();
  // Get the selected language in the following order of priority
  // POST > GET > SESSION > SERVER > DEFAULT
  $selected = isset($_POST["language"]) ? $_POST["language"] : "";
  if (empty($selected) && isset($_GET["language"])) {
    $selected = $_GET['language'];
  } elseif (empty($selected) && isset($_SESSION["language"])) {
    $selected = $_SESSION["language"];
  } elseif (empty($selected) && isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
    $selected = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  }
  // Mark the choosen or the default language as selected
  $languages = _select_language($languages, $selected, $default);
  return $languages;
}


/**
 * Get the available languages.
 *
 * @return an associative array containing the available languages and its
 *  name.
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
      array_push($result, array('code' => $filename, 'language' => $filecontent['language-name']));
    }
  }
  return $result;
}


/**
 * Get the selected language code.
 *
 * @param $languages List of all languages, each containing its code. The selected
 *  language must have a 'selected' field set to true.
 * @return the ISO2 code of the selected language.
 */
function get_selected_language($languages) {
  foreach ($languages as $lang) {
    if ($lang['selected'] === true) {
      return $lang['code'];
    }
  }
  return NULL;
}


/**
 * Check if the required language is valid-
 *
 * @param $language Array containing the list of available languages, each language
 *  must specify its 'code' and 'language' name. For example {'code':'en', 'language':'English'}
 * @param $required Two-letter code of the required language
 * @return true if the required language is availabe or false if it is not.
 */
function _is_valid_language($languages, $required) {
  foreach ($languages as $lang) {
    if ($lang['code'] == $required)
      return true;
  }
  return false;
}


/**
 * Check if the required language is valid-
 *
 * @param $language Array containing the list of available languages, each language
 *  must specify its 'code' and 'language' name. For example {'code':'en', 'language':'English'}
 * @param $required Two-letter code of the required language
 * @param $default Default language to fallback if the required language is not
 *  a valid one. $default MUST BE A VALID LANGUAGE
 * @return List of available languages with the $required or $default language
 *  marked as selected.
 */
function _select_language($languages, $selected, $default) {
  // If the selected language is not valid fallback to the default language
  $lang_to_set = _is_valid_language($languages, $selected) ? $selected : $default;
  // Set the choosen language as selected
  foreach ($languages as $key => $lang) {
    if ($lang['code'] == $lang_to_set) {
      $languages[$key]['selected'] = true;
      break;
    }
  }
  // Return the available $languages with the selected or default language set
  return $languages;
}

/**
 * Get the current user name.
 * 
 * @return an associative array containing the current user name or NULL
 *  if there is not current user.
 */
function _get_current_user() {
  global $user;
  if (!isset($user->name)) {
    return NULL;
  } else {
    return array('name' => $user->name);
  }
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

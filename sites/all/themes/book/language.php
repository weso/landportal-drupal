<?php

class Language {
  /**
   * Get a list with the available languages and the selected language marked.
   *
   * @param $default Default language to use
   * @return An associative array which keys are the ISO2 code of the available
   * languages and which contais the language name under the attribute
   * 'language' and the selected langauge under the attribute 'selected'
   */
  public function get_languages($default) {
    $languages = $this->_get_available_languages();
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
    $languages = $this->select_language($languages, $selected, $default);
    return $languages;
  }


  /**
   * Get the available languages.
   *
   * @return an associative array containing the available languages and its
   *  name.
   */
  private function _get_available_languages() {
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
   * @return the ISO2 code of the selected language.
   */
  public function get_selected_language() {
    $languages = $this->get_languages('en');
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
  private function _is_valid_language($languages, $required) {
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
  private function select_language($languages, $selected, $default) {
    // If the selected language is not valid fallback to the default language
    $lang_to_set = $this->_is_valid_language($languages, $selected) ? $selected : $default;
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
}

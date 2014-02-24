<?php
/**
 * @file
 * twitter_login.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function twitter_login_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "oauthconnector" && $api == "oauthconnector") {
    return array("version" => "1");
  }
}

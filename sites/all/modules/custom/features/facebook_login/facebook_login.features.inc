<?php
/**
 * @file
 * facebook_login.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function facebook_login_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "oauthconnector" && $api == "oauthconnector") {
    return array("version" => "1");
  }
}

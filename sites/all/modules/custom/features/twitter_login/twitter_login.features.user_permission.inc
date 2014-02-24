<?php
/**
 * @file
 * twitter_login.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function twitter_login_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'connect with oauthconnector_twitter'.
  $permissions['connect with oauthconnector_twitter'] = array(
    'name' => 'connect with oauthconnector_twitter',
    'roles' => array(
      'administrator' => 'administrator',
      'anonymous user' => 'anonymous user',
    ),
    'module' => 'connector',
  );

  return $permissions;
}

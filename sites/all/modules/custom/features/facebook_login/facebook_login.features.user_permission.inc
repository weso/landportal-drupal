<?php
/**
 * @file
 * facebook_login.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function facebook_login_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'connect with oauthconnector_facebook'.
  $permissions['connect with oauthconnector_facebook'] = array(
    'name' => 'connect with oauthconnector_facebook',
    'roles' => array(
      'anonymous user' => 'anonymous user',
    ),
    'module' => 'connector',
  );

  return $permissions;
}

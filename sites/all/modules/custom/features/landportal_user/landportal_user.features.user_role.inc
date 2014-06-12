<?php
/**
 * @file
 * landportal_user.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function landportal_user_user_default_roles() {
  $roles = array();

  // Exported role: access API.
  $roles['access API'] = array(
    'name' => 'access API',
    'weight' => 3,
    'machine_name' => 'access_api',
  );

  return $roles;
}

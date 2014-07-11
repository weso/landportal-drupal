<?php
/**
 * @file
 * landdebate_permissions.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function landdebate_permissions_user_default_roles() {
  $roles = array();

  // Exported role: authenticated user with acces to the API.
  $roles['authenticated user with acces to the API'] = array(
    'name' => 'authenticated user with acces to the API',
    'weight' => 3,
  );

  return $roles;
}

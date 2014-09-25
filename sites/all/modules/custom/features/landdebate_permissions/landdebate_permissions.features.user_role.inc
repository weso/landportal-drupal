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

  // Exported role: landportal admin.
  $roles['landportal admin'] = array(
    'name' => 'landportal admin',
    'weight' => 7,
    'machine_name' => 'landportal_admin',
  );

  // Exported role: landportal editor.
  $roles['landportal editor'] = array(
    'name' => 'landportal editor',
    'weight' => 8,
    'machine_name' => 'landportal_editor',
  );

  return $roles;
}

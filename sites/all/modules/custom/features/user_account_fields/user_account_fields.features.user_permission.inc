<?php
/**
 * @file
 * user_account_fields.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function user_account_fields_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create field_api_token'.
  $permissions['create field_api_token'] = array(
    'name' => 'create field_api_token',
    'roles' => array(
      'administrator' => 'administrator',
      'anonymous user' => 'anonymous user',
    ),
    'module' => 'field_permissions',
  );

  // Exported permission: 'edit field_api_token'.
  $permissions['edit field_api_token'] = array(
    'name' => 'edit field_api_token',
    'roles' => array(),
    'module' => 'field_permissions',
  );

  // Exported permission: 'edit own field_api_token'.
  $permissions['edit own field_api_token'] = array(
    'name' => 'edit own field_api_token',
    'roles' => array(),
    'module' => 'field_permissions',
  );

  // Exported permission: 'view field_api_token'.
  $permissions['view field_api_token'] = array(
    'name' => 'view field_api_token',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'field_permissions',
  );

  // Exported permission: 'view own field_api_token'.
  $permissions['view own field_api_token'] = array(
    'name' => 'view own field_api_token',
    'roles' => array(
      'administrator' => 'administrator',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'field_permissions',
  );

  return $permissions;
}

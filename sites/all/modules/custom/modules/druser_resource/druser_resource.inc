<?php

/**
 * Returns the user data from an user_id
 */
function _druser_resource_retrieve($uid) {
	$user_data = user_load($uid);
	// User not found
	if (empty($user_data)) {
		return services_error(t('There is no user with ID @uid.', array('@uid' => $uid)), 404);
	}
	// Remove the sensitive data before returning the user
	remove_sensitive_data($user_data);
	return $user_data;
}

/**
 * Removes the sensitive data from the user object
 */
function remove_sensitive_data(&$user_data) {
	global $user;

	// Remove the user password from the account object.
	unset($user_data->pass);

	// Remove the user init, if current user don't have "administer users"
	// permission.
	if (!user_access('administer users')) {
		unset($user_data->init);
	}

	drupal_alter('services_account_object', $user_data);

	// Add the full URL to the user picture, if one is present.
	if (variable_get('user_pictures', FALSE) && isset($user_data->picture->uri)) {
		$user_data->picture->url = file_create_url($user_data->picture->uri);
	}
}

/**
 * Allows all access
 */
function _druser_access_callback() {
	return TRUE;
}
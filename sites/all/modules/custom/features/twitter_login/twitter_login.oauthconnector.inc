<?php
/**
 * @file
 * twitter_login.oauthconnector.inc
 */

/**
 * Implements hook_default_oauthconnector_provider().
 */
function twitter_login_default_oauthconnector_provider() {
  $export = array();

  $provider = new stdClass();
  $provider->disabled = FALSE; /* Edit this to true to make a default provider disabled initially */
  $provider->api_version = 1;
  $provider->name = 'twitter';
  $provider->title = 'Twitter';
  $provider->url = 'https://api.twitter.com';
  $provider->consumer_advanced = array(
    'oauth2' => 0,
    'signature method' => 'HMAC-SHA1',
    'authentication realm' => '',
    'request token endpoint' => '/oauth/request_token',
    'authorization scope' => '',
    'authorization endpoint' => '/oauth/authorize',
    'access token endpoint' => '/oauth/access_token',
  );
  $provider->mapping = array(
    'fields' => array(
      'uid' => array(
        'resource' => 'https://api.twitter.com/1.1/account/verify_credentials.json',
        'method post' => 0,
        'field' => 'id',
        'querypath' => FALSE,
        'sync_with_field' => 'name',
      ),
      'name' => array(
        'resource' => 'https://api.twitter.com/1.1/account/verify_credentials.json',
        'method post' => 0,
        'field' => 'name',
        'querypath' => FALSE,
        'sync_with_field' => 'field_firstname',
      ),
      'avatar' => array(
        'resource' => 'https://api.twitter.com/1.1/account/verify_credentials.json',
        'method post' => 0,
        'field' => 'profile_image_url',
        'querypath' => FALSE,
        'sync_with_field' => 'picture',
      ),
    ),
    'format' => 'json',
  );
  $export['twitter'] = $provider;

  return $export;
}

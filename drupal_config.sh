#!/usr/bin/env bash
# Enable the following contrib modules
drush en -y features
drush en -y logintoboggan
drush en -y libraries
drush en -y services
drush en -y xmlrpc_server

# Dowload the following contrib modules
drush dl -y oauth

# Enable the custom features
drush en -y user_account_fields
drush en -y facebook_login

# Enable the custom modules
drush en -y ckan_integration_endpoint
drush en -y druser_resource
drush en -y session_resource


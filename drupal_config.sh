#!/usr/bin/env bash
# Enable the following contrib modules
drush dl -y logintoboggan
drush en -y logintoboggan
drush dl -y libraries
drush en -y libraries

# Dowload the following contrib modules
drush dl -y oauth

# Enable the custom features
drush en -y user_account_fields
drush en -y facebook_login

# Enable the Landportal CKAN Integration modules
drush en -y ckan_integration_endpoint
drush en -y druser_resource
drush en -y session_resource

# Enable the Landportal UI modules
drush en -y landportal_uris

# Enable the Landportal Testing modules
drush en -y unit_testing


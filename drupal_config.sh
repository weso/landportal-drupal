#!/usr/bin/env bash

# Enable the following modules
drush en -y features
drush en -y logintoboggan

# Download the following modules
drush dl -y oauth

# Enable the custom features
drush en user_account_fields -y
drush en facebook_login -y

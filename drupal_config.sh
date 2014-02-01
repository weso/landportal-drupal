#!/usr/bin/env bash

# Enable the features module
drush en features -y

# Download the Oauth module
drush dl oauth -y

# Enable the custom features
drush en user_account_fields -y
drush en facebook_login -y

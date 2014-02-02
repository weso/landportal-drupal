#!/usr/bin/env bash
# Enable the following modules
drush en -y features
drush en -y logintoboggan

# Dowload the following modules
drush dl -y oauth

# Enable the custom features
drush en -y user_account_fields
drush en -y facebook_login


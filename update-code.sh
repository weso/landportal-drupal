#!/usr/bin/env bash
cd /var/www/portal
#drush archive-dump --destination=/vagrant/backups/portal.tar.gz
drush archive-restore /vagrant/landportal-drupal/portal.tar.gz --destination=/var/www/portal/ --overwrite


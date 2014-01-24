mysql_root_pass=root
drupal_db=drupal
drupal_user_name=druser
drupal_user_pass=root
drupal_dir=portal
drupal_site_name=LandPortal
drupal_user=admin
drupal_pass=admin
# ------------------------------------ #

# Create Drupal db if not exists
mysql -h localhost -u root -p$mysql_root_pass -e "create database if not exists $drupal_db"

# Grant all privileges to drupal db user
mysql -h localhost -u root -p$mysql_root_pass $drupal_db -e "grant all privileges on $drupal_db.* to $drupal_user_name@localhost identified by '$drupal_user_pass' with grant option"

# Refresh MySQL
mysql -h localhost -u root -p$mysql_root_pass $drupal_db -e "flush privileges"

# Install Drupal
    cd /var/www/$drupal_dir
    drush -y site-install standard --db-url=mysql://$drupal_user_name:$drupal_user_pass@localhost/$drupal_db --site-name=$drupal_site_name --account-name=$drupal_user --account-pass=$drupal_pass

    # Assign (sites/default/files) group ownership to the www-data group
    sudo chown -R root:www-data sites/default/files

    # Enable www-data group to write in sites/default/files
    sudo chmod -R 775 sites/default/files

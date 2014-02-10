landportal-drupal
=================

## LandPortal Drupal codebase

### Setup Instructions

1. Clone this repo in lp-setup environment as "portal_tmp"

        git clone --no-checkout https://github.com/weso/landportal-drupal.git portal_tmp

2. Move the ".git" file to the current Drupal installation

        mv portal_tmp/.git portal/

3. Delete the "portal_tmp" directory 

        rmdir portal_tmp/

4. Get the custom features into the current Drupal installation

        cd portal
        git reset --hard HEAD

### Configuration Instructions

1. Access the Vagrant VM

        vagrant ssh

2. Run the configuration script

        cd /var/www/portal
        ./drupal_config.sh




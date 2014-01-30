landportal-drupal
=================

###LandPortal Drupal codebase

### Setup Instructions
1.- Clone this repo in landportal-setup environment as "portal_tmp"</br>
```
git clone --no-checkout https://github.com/weso/landportal-drupal.git portal_tmp
```

2.- Move the '.git' file to the current Drupal installation</br>
```
mv portal_tmp/.git portal/
```

3.- Delete the "portal_tmp" directory</br>
```
rmdir portal_tmp/
```

4.- Get the custom features into the current Drupal installation</br>
```
git reset --hard HEAD
```

#!/usr/bin/env bash

## General modules
drush dl logintoboggan
drush en -y logintoboggan
drush dl libraries
drush en -y libraries
drush en -y trigger
drush dl apachesolr
drush en -y apachesolr apachesolr_search
drush dl -y oauth


# Enable the custom features
drush en -y facebook_login
drush en -y twitter_login
drush en -y landportal_api_auth


# Enable the Landportal CKAN Integration modules
#drush en -y ckan_integration_endpoint
#drush en -y druser_resource
#drush en -y session_resource

## LandBook moduñes
drush en -y landportal_uris

# Enable the Landportal Testing modules
drush en -y unit_testing

# Enable the LandBook modules
#drush dl -y feeds
#drush en -y feeds feeds_ui
#drush dl feeds_sql
#drush en -y feeds_sql
#drush en -y landbook_nodes
#drush en -y landbook_nodes_importers
#drush en -y landbook_nodes_access

# Disable overlay menus
drush dis -y overlay

## LandDebate modules
drush dl service_links
drush en -y service_links widget_services #Allows showing share buttons in nodes
drush dl i18n
drush en -y i18n_taxonomy #Allows translating taxonomy terms
drush dl batch_add_terms
drush en -y batch_add_terms #Allows adding taxonomy terms in batch
drush dl date
drush en -y date_repeat_field #Allows adding date fields to nodes (used in the detabte nodes)
drush dl link
drush en -y link #Allows adding link fields to nodes (used in the organization nodes)
drush dl social_buttons
drush en -y social_buttons #Shows buttons for sharing nodes in Twitter, Facebook, Google+ and LinkedIn
drush dl views
drush en -y views views_ui #Used for the custom views of the LandDebate
drush dl calendar
drush en -y calendar #Used for displaying the event calendar
drush dl wysiwyg
drush en -y wysiwyg #Displays a WYSIWYG editor for text fields

## LandDebate structure
drush en -y landdebate_content_types #Includes: debate, news, organizations, blog posts and events
drush en -y landdebate_permissions #Permissions to edit and create the LandDebate content types
drush en -y landdebate_views #The custom views created for the LandDebate

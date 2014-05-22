#!/usr/bin/env bash
# Enable the following contrib modules
drush dl -y logintoboggan
drush en -y logintoboggan
drush dl -y libraries
drush en -y libraries
drush en -y trigger
#drush dl -y og
#drush en -y og og_ui og_register
drush dl -y apachesolr
drush en -y apachesolr apachesolr_search
#drush dl -y facetapi
#drush en -y facetapi


# Dowload the following contrib modules
drush dl -y oauth

# Generate authentication tokens for the API
drush en -y landportal_api_auth

# Enable the custom features
drush en -y facebook_login
drush en -y twitter_login

# Enable the Landportal CKAN Integration modules
drush en -y ckan_integration_endpoint
drush en -y druser_resource
drush en -y session_resource

# Enable the Landportal UI modules
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

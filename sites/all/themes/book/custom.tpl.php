<?php
include("mustache.php");

/*
At this point THE FOLLOWING VARIABLES ARE AVAILABLE (from template.php::book_preprocess)
	- $application_data: contains the application data required to render the
	  views such as:
		- the current user name
		- the list of all available languages with ISO2 code, language name, and
		  a selected attribute in the selected language
		- the ISO2 code of the selected language
		- the server name
		- the API url
		- the Sparql endpoint url
	- $theme_path: contains the full path of the theme root folder.
	- $mustache_data: contains all the data required to render the views
	- $mustache_template: contains the name of the template to load
	- $mustache_navigation: contains the name of the upper level of navigation
*/
render_mustache($mustache_data, $mustache_template, $mustache_navigation, $application_data, $theme_path);

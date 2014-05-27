# landportal-drupal
[![Build Status](https://travis-ci.org/weso/landportal-drupal.png)](https://travis-ci.org/weso/landportal-drupal)

This repository contains the *Drupal* configuration for the *LandPortal*, including
the *LandBook* and the *LandDebate*.

## Configuration instructions
Here are the instructions for configuring the *LandPortal*.  All of the following
steps can be easily followed using the *Drupal* administration interface.

### Enable the LandPortal theme
The new *LandPortal* appearance is provided by the **'book'** theme.  To enable
the **book** theme go to the tab **Appearance** in the top bar of the admin
interface.

Once in the **Appearance** tab, scroll down to the bottom of the page, and in the
section *disabled themes* click **Enable and set default** in the
*Book Theme for LandPortal*.  Now, the **book** theme is used by default in all
places except the administration view.

-- **TODO: configure the favicon**

### Import the taxonomy terms
The *LandDebate* uses 5 different *taxonomies* or vocabularies to classify the
different contents: continents, countries, debate status, regions and topics.
Each of this *taxonomies* is populated by *terms*.  Unfortunately, those *terms*
must be imported in a manual way, the import process only needs to be done once.

To start the importing go to the **Structure** tab in the upper bar of the admin
interface.  Once in the **Structure** view, click the **Taxonomy** entry to see
all the defined taxonomies.

The *taxonomy terms* are defined in [the following files](https://github.com/weso/landportal-drupal/tree/enhancement-%2343/taxonomy_terms).
Each of those files corresponds to a certain taxonomy.  
For example, to import
the terms of the taxonomy **topics** click on its **batch add terms** button
and paste the [corresponding terms](https://github.com/weso/landportal-drupal/blob/enhancement-%2343/taxonomy_terms/topics.txt)
and click **Add** (don't forget to select the *Check for duplicates* checkbox, just in case).  
Do the same for each taxonomy to get all the *terms* imported.

### Configure the content types
First of all Drupal creates some default content types.  Since we are not using
those content types, they can be easily removed from the **admin/structure/types**
view.  The removable content types are:
 - Article
 - Basic page
 - Group

#### Configure the *Blog post* content type
In the *submission form settings* section change the option **preview before submitting**
to **disabled**.  
In the *comment settings* section uncheck the option **threading** and the
option **allow comment title**.  
Last change the option **preview comment** to **disabled**.

#### Configure the *Debate* content type
In the *submission form settings* section change the option **preview before submitting**
to **disabled**.  
In the *comment settings* section change the option **preview comment** to **disabled**.  

#### Configure the *Event* content type
In the *submission form settings* section change the option **preview before submitting**
to **disabled**.  
In the *comment settings* section change the option **default comment setting for new content**
to **hidden**.

#### Configure the *News* content type
The *News* content type has the same configuration as the *Event* content type.

#### Configure the *Organization* content type
The *Organization* content type has the same configuration as the *Event* and *News*
content type.
In the *comment settings* section change the option **preview comment** to **disabled**.  

### Configure the WYSIWYG editor options
The *WYSIWYG* module allows *Drupal* to show a nice text editor component in which
the users can easily format the text and insert images.  
To edit the options go to the path *admin/config/content/wysiwyg* and for each
profile choose the editor **markItUp 1.1.14**.  
After selecting the editor you can  change its options and choose which buttons
to show.  We suggest enabling all the buttons for the best user experience.

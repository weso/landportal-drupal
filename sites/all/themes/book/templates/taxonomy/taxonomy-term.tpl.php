<?php

/**
 * @file
 * Custon taxonomy-term page for the LandPortal. This page loads all the node ids
 * related with the current taxonomy-term and then renders each node in a way
 * similar to the search page.
 *
 * Available variables:
 * - $name: (deprecated) The unsanitized name of the term. Use $term_name
 *   instead.
 * - $content: An array of items for the content of the term (fields and
 *   description). Use render($content) to print them all, or print a subset
 *   such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $term_url: Direct URL of the current term.
 * - $term_name: Name of the current term.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - taxonomy-term: The current template type, i.e., "theming hook".
 *   - vocabulary-[vocabulary-name]: The vocabulary to which the term belongs to.
 *     For example, if the term is a "Tag" it would result in "vocabulary-tag".
 *
 * Other variables:
 * - $term: Full term object. Contains data that may not be safe.
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $page: Flag for the full page state.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the term. Increments each time it's output.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_taxonomy_term()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<?php require_once(drupal_get_path('theme', 'book') .'/template-loader.php'); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $related_nids = taxonomy_select_nodes($term->tid); ?>
<?php $title = $labels['content_tagged_with'] . " '$term_name'"; ?>

<!-- HEADER -->
<?php get_template('search-header', 'search', $application_data, $theme_path); ?>

<div class='content main-content container'>
    <!-- BREADCRUMBS -->
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li class="active"><?php echo $title; ?></li>
    </ol>
    <!-- TITLE -->
    <div class='row'>
        <div class='col-sm-12'>
            <h1>
                <span class='country-name'>
                    <?php echo $title; ?>
                </span>
            </h1>
        </div>
    </div>
</div>
<!-- The nodes related with this taxonomy term are printed below automatically by Drupal -->

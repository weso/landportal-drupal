<!-- Custom search page for the LandPortal -->

<!-- HEADER -->
<?php require_once(drupal_get_path('theme', 'book') .'/template-loader.php'); ?>
<?php get_template('debate-header', 'community', $application_data, $theme_path); ?>
<!-- CONTENT -->
<div class='content main-content container'>
    <div class='row'>
        <!-- SEARCH RESULTS -->
        <div class='col-sm-12'>
            <?php print render($page['content']['system_main']['search_results']); ?>
        </div>
    </div>
    <div class='row'>
        <!-- SEARCH FORM -->
        <div class='col-sm-12'>
            <div class='search-results'>
                <?php if ($page['content']): ?>
                    <?php print render($page['content']['system_main']['search_form']); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
<!-- FOOTER -->
<?php get_template('footer', 'events', $application_data, $theme_path); ?>

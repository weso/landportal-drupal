<!-- Custom search page for the LandPortal -->
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>
<div class="content main-content container">
    <div class="row">
        <div class="col-sm-12">
            <?php if ($page['content']): ?>
                <?php print render($page['content']); ?>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php get_template("footer", "events", $application_data, $theme_path); ?>

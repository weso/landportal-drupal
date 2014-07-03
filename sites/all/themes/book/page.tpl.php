<?php require_once(drupal_get_path("theme", "book") ."/templates/status_messages.php"); ?>

<?php if ($page['content']): ?>
    <?php print render($page['content']); ?>
<?php endif; ?>

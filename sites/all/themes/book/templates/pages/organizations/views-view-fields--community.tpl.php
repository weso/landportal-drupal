<?php

/**
 * This template renders each organization entry in the community view only
 * with its image and title.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row debate-entry">
  <div class="col-sm-12">
    <!-- Image -->
    <?php print $fields["field_image"]->content; ?>
    <!-- Title -->
    <h3><?php print $fields["title"]->content; ?></h3>
  </div>
</div>

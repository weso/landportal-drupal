<?php

/**
 * This template renders each organization entry in the community view only
 * with its image and title.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row debate-entry">
  <div class="col-sm-12" style="min-height: 250px; text-align: center;">
    <!-- Image -->
    <?php print $fields["field_image"]->content; ?>
    <!-- Title -->
    <br/><?php print $fields["title"]->content; ?>
  </div>
</div>

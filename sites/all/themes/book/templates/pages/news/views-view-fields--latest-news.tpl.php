<?php

/**
 * This view renders each element shown in the latest-views page.  Each element
 * has an image, title, content teaser and a button for read more.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row news-entry">
  <div class="col-sm-3">
    <!-- Image -->
    <?php print $fields["field_image"]->content; ?>
  </div>
  <div class="col-sm-9">
    <!-- Title -->
    <h3><?php print $fields["title"]->content; ?></h3>
    <!-- Content teaser -->
    <div class="news-entry-description">
        <p><?php print $fields["body"]->content; ?></p>
    </div>
    <!-- Read more -->
    <p class="read-more">
      <a href="/node/<?php print $row->nid; ?>"><?php print $labels["read_more"]; ?></a>
    </p>
  </div>
</div>

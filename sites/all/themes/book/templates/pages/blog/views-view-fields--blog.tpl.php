<?php

/**
 * This view renders a blog entry including image, title, author and date,
 * related topics, content teaser and a button for read more.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row blog-entry">
  <div class="col-sm-3">
    <!-- Image -->
    <?php print $fields["field_image"]->content; ?>
  </div>
  <div class="col-sm-9">
    <!-- Title -->
    <h3><?php print $fields["title"]->content; ?></h3>
    <!-- Author and date -->
    <div class="user date">
      <?php echo $labels["written_by"]; ?>
      <?php $author_id = $fields["uid"]->raw; ?>
      <a href="/user/<?php echo $author_id; ?>" class="user"><?php
        $user_fields = user_load(intval($author_id));
        print $user_fields->name;
      ?></a>
      <?php echo $labels["on"], " ", $fields["created"]->content; ?>
    </div>
    <!-- Related topics -->
    <div class="topics">
      <?php print $fields["field_related_topics"]->content; ?>
    </div>
    <!-- Content teaser -->
    <div class="blog-post-description">
        <p><?php print $fields["body"]->content; ?></p>
    </div>
    <!-- Read more -->
    <p class="read-more">
      <a href="/node/<?php print $row->nid; ?>"><?php print $labels["read_more"]; ?></a>
    </p>
  </div>
</div>

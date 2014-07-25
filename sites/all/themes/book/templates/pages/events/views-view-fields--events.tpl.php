<?php

/**
 * This view renders each event entry shown in the events view.  Each entry has
 * an image, title, author and date, related topics, content teaser and a button
 * for read more.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row events-entry">
  <div class="col-sm-3">
    <!-- Image -->
    <?php print $fields["field_image"]->content; ?>
  </div>
  <div class="col-sm-9">
    <!-- Title -->
    <h3><?php print $fields["title"]->content; ?></h3>
    <header>
      <!-- Author and date -->
      <div class="user date">
            <?php $creator = intval($fields['uid']->raw); ?>
            <?php echo $labels["written_by"]; ?>
            <a href="/user/<?php echo $creator; ?>" class="user">
                <?php $user_fields = user_load($creator); ?>
                <?php if (isset ($user_fields->field_firstname)): ?>
                    <?php echo $user_fields->field_firstname['und'][0]['safe_value']; ?>
                    <?php echo ' '; ?>
                    <?php echo $user_fields->field_lastname['und'][0]['safe_value']; ?>
                <?php else: ?>
                    <?php echo $user_fields->name; ?>
                <?php endif; ?>
            </a>
          <?php echo $labels["on"], " ", date($labels["date_format"], $created); ?>
        </div>
      <!-- Related topics -->
      <div class="topics">
        <?php print $fields["field_related_topics"]->content; ?>
      </div>
    </header>
    <!-- Content teaser -->
    <div class="event-description">
        <p><?php print $fields["body"]->content; ?></p>
    </div>
    <!-- Read more -->
    <p class="read-more">
      <a href="/node/<?php print $row->nid; ?>"><?php print $labels["read_more"]; ?></a>
    </p>
  </div>
</div>

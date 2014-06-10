<?php

/**
 * This view renders each last debate entry with image, debate status, date,
 * facilitator, title, related topics, content teaser and a read-more button.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $field_date_begining = strtotime($row->field_data_field_date_field_date_value); ?>
<?php $field_date_end = strtotime($row->field_data_field_date_field_date_value2); ?>

<div class="row debate-entry">
    <div class="col-sm-3">
        <!-- Image -->
        <?php print $fields["field_image"]->content; ?>
        <!-- Debate status -->
        <div class="debate-status"><?php print $fields["field_status"]->content; ?></div>
        <!-- Date -->
        <div class="event-date">
          <h2 class="section">
            <span><?php echo $labels["date"]; ?></span>
          </h2>
          <?php echo $labels["from"], " ", date($labels["date_format"], $field_date_begining); ?>
          <br>
          <?php echo $labels["to"], " ", date($labels["date_format"], $field_date_end); ?>
        </div>
        <!-- Facilitator -->
        <div class="facilitator">
          <h2 class="section">
            <span><?php echo $labels["facilitated_by"]; ?></span>
          </h2>
          <?php $facilitator_id = $fields["uid"]->raw; ?>
          <?php print theme('user_picture', array('account' =>user_load($facilitator_id))); ?>
          <a href="/user/<?php echo $facilitator_id; ?>" class="user"><?php
              $user_fields = user_load(intval($facilitator_id));
              print $user_fields->name;
          ?></a>
        </div>
    </div>
    <div class="col-sm-9">
        <!-- Title -->
        <h3><?php print $fields["title"]->content; ?></h3>
        <!-- Related topics -->
        <div class="topics"><?php print $fields["field_related_topics"]->content; ?></div>
        <!-- Content teaser -->
        <div class="debate-description">
            <p><?php print $fields["body"]->content; ?></p>
        </div>
        <!-- Read more -->
        <p class="read-more">
            <a href="/node/<?php print $row->nid; ?>"><?php print $labels["read_more"]; ?></a>
        </p>
    </div>
</div>

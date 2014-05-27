<?php

/**
 * @file
 * Shows a debate entry with image, date, status, title, author, topics and teaser.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<?php include_once("template-loader.php");
  $labels = get_labels($application_data['languages']);
?>
<div class="row debate-entry">
    <div class="col-sm-3">
        <!-- Image -->
        <?php print $fields["field_image"]->content; ?>
        <!-- Date -->
        <p class="date"><?php print $fields["field_date"]->content; ?></p>
        <!-- Debate status -->
        <div class="debate-status"><?php print $fields["field_status"]->content; ?></div>
    </div>
    <div class="col-sm-9">
        <!-- Title -->
        <h3><?php print $fields["title"]->content; ?></h3>
        <!-- Facilitator -->
        <div class="user">
            <?php $facilitator_id = $fields["uid"]->raw; ?>
            <?php echo $labels["facilitated_by"]; ?>
            <a href="/user/<?php echo $facilitator_id; ?>" class="user"><?php
                $user_fields = user_load(intval($facilitator_id));
                print $user_fields->name;
            ?></a>
        </div>
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

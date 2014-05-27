<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
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
 *     configured element type object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<?php include_once("template-loader.php");
    $labels = get_labels($application_data['languages']);
?>
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

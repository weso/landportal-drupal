<?php include_once(drupal_get_path("theme", "book") ."/utils/utils.php"); ?>
<?php include_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php
  // We check if the form node has an ID.  If it does not, then we are creating
  // a new node, and the breadcrumbs and page title text must be changed to
  // reflect this.
  $is_node_creation = !isset($form["nid"]["#value"]);
?>

<?php $translated_form = translate_form_titles($form, array(
  "title" => $labels["title"],
  "body" => $labels["body"],
  "field_image" => $labels["image"],
  "field_image_button" => $labels["upload"],
  "field_related_topics" => $labels["edit-field-related-topics-tid"],
  "field_related_region" => $labels["world_region"],
  "field_date" => $labels["date"],
  "submit" => $labels["save"],
  "field_status" => $labels["status"],
  "field_language" => $labels["language"],
  ));
?>
<!--
<pre>
  <?php print_r($form); ?>
</pre>
-->
<!-- Header -->
<?php get_template("debate-header", "debates", $application_data, $theme_path); ?>
<!-- Page content -->
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/debates"><?php echo $labels["debates"]; ?></a></li>
    <?php if ($is_node_creation): ?>
    <li class="active"><?php echo $labels["create_new_debate"]; ?></li>
    <?php else: ?>
      <li><a href="/node/<?php echo $form["nid"]["#value"]; ?>"><?php echo $form["#node"]->title ; ?></a></li>
      <li class="active"><?php echo $labels["edit"]; ?></li>
    <?php endif; ?>
  </ol>
  <!-- Page title -->
  <div class="row">
    <div class="col-sm-12">
      <h1>
        <span class="country-name">
          <?php if ($is_node_creation): ?>
            <?php echo $labels["create_new_debate"]; ?>
          <?php else: ?>
            <?php echo $labels["edit"]; ?>
          <?php endif; ?>
        </span>
      </h1>
    </div>
  </div>
  <div class="row">
    <!-- Form -->
    <div class="drupal-form-help text-center">
      <h4><?php echo $labels['help']; ?></h4>
      <?php echo $labels['drupal_text_field_help']; ?>
    </div>
    <div class="col-sm-12">
      <?php print drupal_render_children($form); ?>
    </div>
  </div>
</div>
<!-- Footer -->
<?php get_template("footer", "debates", $application_data, $theme_path); ?>

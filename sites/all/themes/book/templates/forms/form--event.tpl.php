<?php include_once(drupal_get_path("theme", "book") ."/utils/utils.php"); ?>
<?php include_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php translate_form_titles($form, array(
  "title" => $labels["title"],
  "body" => $labels["body"],
  "field_date" => $labels["date"],
  "field_image" => $labels["image"],
  "submit" => $labels["save"],
  "field_related_topics" => $labels["edit-field-related-topics-tid"],
  ));
?>

<!-- Header -->
<?php get_template("debate-header", "events", $application_data, $theme_path); ?>
<!-- Page content -->
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/events"><?php echo $labels["events"]; ?></a></li>
    <li class="active"><?php echo $labels["create_new_event"]; ?></li>
  </ol>
  <!-- Page title -->
  <div class="row">
    <div class="col-sm-12">
      <h1>
        <span class="country-name">
          <?php echo $labels["create_new_event"]; ?>
        </span>
      </h1>
    </div>
  </div>
  <div class="row">
    <!-- Form -->
    <div class="col-sm-12">
      <?php print drupal_render_children($form); ?>
    </div>
  </div>
</div>
<!-- Footer -->
<?php get_template("footer", "events", $application_data, $theme_path); ?>

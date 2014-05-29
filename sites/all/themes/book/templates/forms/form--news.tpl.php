<?php include_once(drupal_get_path("theme", "book") ."/utils/utils.php"); ?>
<?php include_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php translate_form_titles($form, array(
  "title" => $labels["title"],
  "body" => $labels["body"],
  "field_image" => $labels["image"],
  "submit" => $labels["save"],
  ));
?>

<!-- Header -->
<?php get_template("debate-header", "news", $application_data, $theme_path); ?>
<!-- Page content -->
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/news"><?php echo $labels["news"]; ?></a></li>
    <li class="active"><?php echo $labels["create_new_news"]; ?></li>
  </ol>
  <!-- Page title -->
  <div class="row">
    <div class="col-sm-12">
      <h1 class="country-name">
        <span class="country-name">
          <?php echo $labels["create_new_news"]; ?>
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
<?php get_template("footer", "news", $application_data, $theme_path); ?>

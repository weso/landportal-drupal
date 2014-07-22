<?php

/**
 * This view shows the LandPortal community.  It calls automatically the template
 * 'views-exposed-form--community' for rendering the search controls and the
 * template 'views-view-unformatted--community' for rendering each community detail.
 */
?>
<!-- Highlights the corresponding tab in the header -->
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php get_template("debate-header", "community", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li class="active"><?php echo $labels["community"]; ?></li>
  </ol>
  <!-- View title -->
  <div class="row">
    <div class="col-sm-12">
      <h1>
        <span class="country-name">
          <?php echo $labels["community"]; ?>
        </span>
      </h1>
    </div>
  </div>
  <?php if ($is_admin): ?>
    <div class="row add-new-node">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <a href="/node/add/organization"><button class="btn data-button"><?php echo $labels['create_new_organization']; ?></button></a>
      </div>
    </div>
  <?php endif; ?>
  <div class="row">
    <div class="col-sm-9">
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <?php print $title; ?>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php if ($header): ?>
        <div class="view-header">
          <?php print $header; ?>
        </div>
      <?php endif; ?>

      <?php if ($rows): ?>
        <div class="view-content">
          <?php print $rows; ?>
        </div>
      <?php elseif ($empty): ?>
        <div class="view-empty">
          <?php print $empty; ?>
        </div>
      <?php endif; ?>

      <?php if ($pager): ?>
        <?php print $pager; ?>
      <?php endif; ?>

      <?php if ($more): ?>
        <?php print $more; ?>
      <?php endif; ?>
    </div> <!-- End column -->
    <div class="col-sm-3">
      <?php if ($exposed): ?>
        <div class="view-filters">
          <?php print $exposed; ?>
        </div>
      <?php endif; ?>
      <div class="facebook-widget">
        <!-- This is a temporal placeholder and not the real Facebook widget" This is a temporal placeholder and not the real Facebook widget-->
        <img src="<?php echo "{$theme_path}/static/images/landportal-facebook-image.png"; ?>" alt="This is a temporal placeholder and not the real Facebook widget"></script>
      </div>
    </div> <!-- End column -->
  </div> <!-- End row -->

</div>
<?php get_template("footer", "community", $application_data, $theme_path); ?>

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
      <div class="facebook-widget">
<iframe
src="//www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/landportal&width=292&colorscheme=light&show_faces=true&bordercolor&stream=true&header=true&height=880&show_border=false&force_wall=true"
scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 340px; height: 880px;"
allowTransparency="true" title="Like us on Facebook">
</iframe>        <!-- This is a temporal placeholder and not the real Facebook widget -->
      </div>
    </div> <!-- End column -->
  </div> <!-- End row -->

</div>
<?php get_template("footer", "community", $application_data, $theme_path); ?>

<?php

/**
 * This view renders the events template.  Shows the two most recent events with
 * detail and the older events only with title and date.
 */
?>
<!-- Highlights the corresponding tab in the header -->
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php get_template("debate-header", "events", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li class="active"><?php echo $labels["events"]; ?></li>
  </ol>
  <!-- RSS icon -->
  <div class="row">
      <div class="col-sm-12">
          <div class="text-right rss-button">
                <a href="/debate/events.xml">
                  <span class="rss-text"><?php echo $labels['rss']; ?></span>
                  <i class="fa fa-rss-square fa-lg" title="<?php echo $labels['rss']; ?>"></i>
                </a>
          </div>
      </div>
  </div>
  <!-- View title -->
  <div class="row">
    <div class="col-sm-12">
      <h1>
        <span class="country-name">
          <?php echo $labels["land_events"]; ?>
        </span>
      </h1> <!-- End column -->
    </div> <!-- End row -->
  </div>
  <?php if ($logged_in): ?>
    <div class="row add-new-node">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <a href="/node/add/event"><button class="btn data-button"><?php echo $labels['create_new_event']; ?></button></a>
      </div>
    </div>
  <?php endif; ?>
  <div class="row">
    <div class="col-sm-12">
      <?php if ($title): ?>
        <?php print $title; ?>
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
    </div> <!-- End column -->
  </div> <!-- End row -->

  <!-- Older posts -->
  <div class="row">
    <div class="col-sm-9">
      <h2 class="section older-events">
        <span class="older-events">
          <?php echo $labels["older_events"]; ?>
        </span>
      </h3>
      <?php if ($footer): ?>
        <div class="view-footer">
          <?php print $footer; ?>
        </div>
      <?php endif; ?>
    </div> <!-- End column -->
    <!-- Event calendar -->
    <div class="col-sm-3">
      <?php if ($header): ?>
        <div class="view-header">
          <?php print $header; ?>
        </div>
      <?php endif; ?>
    </div> <!-- End column -->
  </div> <!-- End row -->
</div>
<?php get_template("footer", "events", $application_data, $theme_path); ?>

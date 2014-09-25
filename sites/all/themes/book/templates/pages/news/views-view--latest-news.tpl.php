<?php

/**
 * This view renders the latest news added to the LandPortal and a Twitter widget
 * on the right side.  Older news are shown in the bottom with only post date
 * and title.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<!-- HEADER -->
<?php get_template("debate-header", "news", $application_data, $theme_path); ?>

<!-- CONTENT -->
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li class="active"><?php echo $labels["news"]; ?></li>
  </ol>
  <!-- RSS icon -->
  <div class="row">
      <div class="col-sm-12">
          <div class="text-right rss-button">
                <a href="/debate/news.xml">
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
          <?php echo $labels["land_news"]; ?>
        </span>
      </h1>
    </div>
  </div>
  <!-- Content creation (only if the user is logged in) -->
  <?php if ($logged_in): ?>
    <div class="row add-new-node">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <a href="/node/add/news"><button class="btn data-button"><?php echo $labels['create_new_news']; ?></button></a>
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

      <?php if ($exposed): ?>
        <div class="view-filters">
          <?php print $exposed; ?>
        </div>
      <?php endif; ?>

      <?php if ($attachment_before): ?>
        <div class="attachment attachment-before">
          <?php print $attachment_before; ?>
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

      <?php if ($attachment_after): ?>
        <div class="attachment attachment-after">
          <?php print $attachment_after; ?>
        </div>
      <?php endif; ?>

      <?php if ($more): ?>
        <?php print $more; ?>
      <?php endif; ?>
    </div>
    <!-- Twitter timeline -->
    <div class="col-sm-3">
      <a class="twitter-timeline" href="https://twitter.com/search?q=%23landportal" data-widget-id="515155865456766978" data-chrome="nofooter transparent noscrollbar" data-tweet-limit="5">Landportal on Twitter</a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </div>
  </div> <!-- End row -->

  <!-- Older posts -->
  <div class="row">
      <div class="col-sm-12">
        <h2 class="section older-posts">
          <span class="older-posts">
            <?php echo $labels["older_news"]; ?>
          </span>
        </h3>

      <?php if ($footer): ?>
        <div class="view-footer">
          <?php print $footer; ?>
        </div>
      <?php endif; ?>
    </div>
    <?php if ($feed_icon): ?>
      <div class="feed-icon">
        <?php print $feed_icon; ?>
      </div>
    <?php endif; ?>
  </div> <!-- End row -->
</div>

<!-- FOOTER -->
<?php get_template("footer", "news", $application_data, $theme_path); ?>

<?php

/**
 * This view shows the latest debates calling automatically the template
 * 'views-view-fields--latest-debates-page' for rendering each entry.
 * Older deabtes are only shown with title and date.
 */

?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php get_template("debate-header", "debates", $application_data, $theme_path); ?>
<div class="content main-content container">
    <div class="row">
        <div class="col-sm-12">
            <ol class="breadcrumb">
                <li><a href="/"><?php echo $labels["index"]; ?></a></li>
                <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
                <li class="active"><?php echo $labels["debates"]; ?></li>
            </ol>
        </div>
    </div>
    <!-- RSS icon -->
    <div class="row">
        <div class="col-sm-12">
            <div class="text-right rss-button">
                  <a href="/debate/debates.xml">
                    <span class="rss-text"><?php echo $labels['rss']; ?></span>
                    <i class="fa fa-rss-square fa-lg" title="<?php echo $labels['rss']; ?>"></i>
                  </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <h1>
                <span class="country-name">
                    <?php echo $labels["debates"]; ?>
                </span>
            </h1>
        </div>
    </div>
    <?php if ($logged_in): ?>
      <div class="row add-new-node">
        <div class="col-sm-9"></div>
        <div class="col-sm-3">
          <a href="/node/add/debate"><button class="btn data-button"><?php echo $labels['create_new_debate']; ?></button></a>
        </div>
      </div>
    <?php endif; ?>
    <div class="row">
        <div class="col-sm-9">
            <div class="<?php print $classes; ?>">

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
                <div class="row view-empty">
                  <?php print $empty; ?>
                </div>
              <?php endif; ?>

              <?php if ($attachment_after): ?>
                <div class="attachment attachment-after">
                  <?php print $attachment_after; ?>
                </div>
              <?php endif; ?>

              <?php if ($more): ?>
                <?php print $more; ?>
              <?php endif; ?>

              <div class="row">
                <div class="col-sm-12">
                  <h2 class="section older-debates">
                    <span class="older-debatees">
                      <?php echo $labels["older_debates"]; ?>
                    </span>
                  </h2>
                  <?php if ($footer): ?>
                    <div class="view-footer">
                      <?php print $footer; ?>
                    </div>
                  <?php endif; ?>
                  <?php if ($feed_icon): ?>
                    <div class="feed-icon">
                      <?php print $feed_icon; ?>
                    </div>
                  <?php endif; ?>
                </div>
              </div>
            </div>
        </div>
        <div class="col-sm-3">
            <?php print render($title_prefix); ?>
            <?php if ($title): ?>
              <?php print $title; ?>
            <?php endif; ?>
            <?php print render($title_suffix); ?>

        </div>

    <!-- Twitter timeline -->
    <div class="col-sm-3">
      <a class="twitter-timeline" href="https://twitter.com/search?q=%23landportal" data-widget-id="515155865456766978" data-chrome="nofooter transparent noscrollbar" data-tweet-limit="5">Landportal on Twitter</a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </div>

    </div>
</div>
<?php /* class view */
get_template("footer", "debates", $application_data, $theme_path);
 ?>

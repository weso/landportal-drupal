<?php

/**
 * This view renders the blog.  Shows the 3 most recent posts with detail and
 * the older posts with only title and date.
 *
 * This template calls automatically the template 'views-view-unformatted-blog'
 * to render each blog entry.
 */
?>
<!-- Highlights the corresponding tab in the header -->
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php");
  get_template("debate-header", "blog", $application_data, $theme_path);
  $labels = get_labels($application_data['languages']);
?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li class="active"><?php echo $labels["land_blog"]; ?></li>
  </ol>
  <!-- RSS icon -->
  <div class="row">
      <div class="col-sm-12">
          <div class="text-right rss-button">
                <a href="/debate/blog.xml">
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
          <?php echo $labels["land_blog"]; ?>
        </span>
      </h1>
    </div>
  </div>
  <?php if ($is_admin): ?>
    <div class="row add-new-node">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <a href="/node/add/blog-post"><button class="btn data-button"><?php echo $labels['create_new_blog_post']; ?></button></a>
      </div>
    </div>
  <?php endif; ?>
  <div class="row">
    <div class="col-sm-12">
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
  </div> <!-- End row -->

  <!-- Older posts -->
  <div class="row">
      <div class="col-sm-12">
        <h2 class="section older-posts">
          <span class="older-posts">
            <?php echo $labels["older_posts"]; ?>
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
<?php get_template("footer", "blog", $application_data, $theme_path); ?>

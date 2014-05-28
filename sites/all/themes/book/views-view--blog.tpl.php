<?php

/**
 * @file
 * Blog template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<!-- Highlights the corresponding tab in the header -->
<?php include_once("template-loader.php");
  get_template("debate-header", "blog", $application_data, $theme_path);
  $labels = get_labels($application_data['languages']);
?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li class="active"><?php echo $labels["land_blog"]; ?></li>
  </ol>
  <!-- View title -->
  <div class="row">
    <div class="col-sm-12">
      <h1 class="country-name">
        <span class="country-name">
          <?php echo $labels["land_blog"]; ?>
        </span>
      </h1>
    </div>
  </div>
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
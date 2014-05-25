<?php

/**
 * @file
 * Shows opened and coming debates, closed debates and recent comments.
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
<?php include("template-loader.php");
    get_template("debate-header", "debates", $application_data, $theme_path);
    $labels = get_labels($application_data['languages']);
?>
<div class="content main-content container">
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li class="active"><?php echo $labels["debates"]; ?></li>
    </ol>
    <div class="row">
        <div class="col-sm-12">
            <h1 class="country-name">
                <span class="country-name">
                    <?php echo $labels["land_debates"]; ?>
                </span>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-9">
            <div class="<?php print $classes; ?>">

              <?php if ($attachment_before): ?>
                <div class="attachment attachment-before">
                  <?php print $attachment_before; ?>
                </div>
              <?php endif; ?>

              <?php if ($rows): ?>
                <div class="row view-content">
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

              <?php if ($footer): ?>
                <div class="row view-footer">
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
        <div class="col-sm-3">
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
        </div>
    </div>
</div>
<?php /* class view */
get_template("footer", "debates", $application_data, $theme_path);
 ?>

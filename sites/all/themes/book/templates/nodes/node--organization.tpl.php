<?php

/**
 * @file
 * LandPortal template to display an organization node.  This template has two variants
 * depending on the type of view.
 *  - If the view is 'full' the template will render entirely, with header, footer,
 *    breadcrumbs, and all node content.
 *  - If the view is 'teaser' the template will render only the node title, url
 *    a snippet of the content and a smapll label indicanting that it is an organization.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $node_id = $node->nid; ?>
<?php global $user; ?>
<?php $can_edit = $is_admin; ?>
<?php $can_delete = $is_admin; ?>

<!-- FULL VIEW -->
<?php if ($view_mode === 'full'): ?>
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/community"><?php echo $labels["community"]; ?></a></li>
    <li class="active"><?php echo $title; ?></li>
  </ol>
  <!-- Title -->
  <div class="row">
    <div class="col-sm-12">
      <h1>
        <span class="country-name">
          <?php echo $title; ?>
        </span>
      </h1>
    </div>
  </div>
  <div class="row node-view">
    <!-- Left column -->
    <div class="col-sm-3">
      <?php print render($content["field_image"]); ?>
      <!-- Edition buttons -->
      <div class="row edition-buttons">
        <?php if ($can_edit): ?>
          <a href="<?php echo "/node/$node_id/edit"; ?>"><button class="btn data-button"><?php echo $labels['edit']; ?></button></a>
        <?php endif; ?>
        <?php if ($can_delete): ?>
          <a href="<?php echo "/node/$node_id/delete"; ?>"><button class="btn data-button"><?php echo $labels['delete']; ?></button></a>
        <?php endif; ?>
      </div>
    </div>
    <!-- Central column -->
    <div class="col-sm-6">
      <div class="body">
        <?php print render($content["body"]); ?>
      </div>
      <div class="website">
        <a href="<?php echo $node->field_link['und']['0']['url']; ?>"><?php echo $labels["visit_website"]; ?></a>
      </div>
    </div>
    <!-- Right column -->
    <div class="col-sm-3">
      <header class="entry-header">
        <!-- Related topics -->
        <div class="topics entry-header-entry">
          <?php print render($content["field_related_topics"]); ?>
        </div>
        <!-- Operations area -->
        <div class="entry-header-entry">
          <h2 class="section">
            <span><?php echo $labels["operations_area"]; ?></span>
          </h2>
          <?php print render($content["field_related_continents"]); ?>
        </div>
        <!-- Related countries -->
        <div class="entry-header-entry">
          <h2 class="section">
            <span><?php echo $labels["countries_of_work"]; ?></span>
          </h2>
          <?php print render($content["field_related_countries"]); ?>
        </div>
      </header>
    </div>
  </div>
</div>
<?php get_template("footer", "events", $application_data, $theme_path); ?>

<!-- RESUMED VIEW -->
<?php else: ?>
<?php $body = $node->body['und'][0]['safe_value']; ?>

<!-- See node-debate.tpl.php for an explanation -->
<?php if ($view_mode !== 'user-profile'): ?>
<div class='container'>
<?php endif; ?>
    <div class="row search-result">
        <div class="col-sm-12">
            <?php $url = "/node/$node_id"; ?>
            <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
            <a class="url" href="<?php echo $url; ?>"><?php echo "http://".$_SERVER['HTTP_HOST'].$url; ?></a>
            <p class="description"><?php echo substr($body, 0, 300), ' ...'; ?></p>
            <p><a class="search-result-label label-organization" href="/debate/organizations"><?php echo $labels['organization']; ?></a></p>
        </div>
    </div>
    <?php if ($view_mode !== 'user-profile'): ?>
</div>
<?php endif; ?>

<?php endif; ?>

<?php

/**
 * @file
 * LandPortal template to display an event node.  This template has two variants
 * depending on the type of view.
 *  - If the view is 'full' the template will render entirely, with header, footer,
 *    breadcrumbs, and all node content.
 *  - If the view is 'teaser' the template will render only the node title, url
 *    a snippet of the content and a smapll label indicanting that it is an event.
 */
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $node_id = $node->nid; ?>
<?php global $user;?>
<?php $can_edit = $is_admin || ($logged_in && $user->uid === $uid); ?>
<?php $can_delete = $is_admin; ?>
<?php $field_date_begining = strtotime($node->field_date["und"]["0"]["value"]); ?>
<?php $field_date_end = strtotime($node->field_date["und"]["0"]["value2"]); ?>

<!-- FULL VIEW -->
<?php if ($view_mode === 'full'): ?>
<?php get_template("debate-header", "events", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/events"><?php echo $labels["events"]; ?></a></li>
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
    <div class="col-sm-3">
      <div class="image">
        <?php print render($content["field_image"]); ?>
      </div>
      <div class="event-date">
        <h2 class="section">
          <span><?php echo $labels["date"]; ?></span>
        </h2>
        <?php if ($field_date_begining == $field_date_end): ?>
          <?php echo $labels["on"], " ", date($labels["date_format"], $field_date_begining)?>
        <?php else: ?>
          <?php echo $labels["from"], " ", date($labels["date_format"], $field_date_begining)?>
          <br>
          <?php echo $labels["to"], " ", date($labels["date_format"], $field_date_end)?>
        <?php endif;?>
      </div>
      <div class="social-buttons">
        <h2 class="section">
          <span><?php echo $labels["share"]; ?></span>
        </h2>
        <script src="<?php echo "{$theme_path}/js/share.js"; ?>"></script>
      </div>
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
    <div class="col-sm-9">
      <header class="entry-header">
        <!-- Related topics -->
        <div class="topics">
          <?php print render($content["field_related_topics"]); ?>
        </div>
        <!-- Author and date -->
        <div class="user date">
          <?php echo $labels["written_by"]; ?>
          <?php echo render($name); ?>
          <?php echo $labels["on"], " ", date($labels["date_format"], $created); ?>
        </div>
      </header>
      <!-- Body -->
      <div class="body">
        <?php print render($content["body"]); ?>
      </div>
    </div>
  </div>
</div>
<?php get_template("footer", "events", $application_data, $theme_path); ?>

<!-- RESUMED VIEW -->
<?php else: ?>
<?php $body = $node->body['und'][0]['value']; ?>
<div class=' container'>
    <div class="row search-result">
        <div class="col-sm-12">
            <?php $url = "/node/$node_id"; ?>
            <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
            <a class="url" href="<?php echo $url; ?>"><?php echo $url; ?></a>
            <p class="description"><?php echo substr($body, 0, 300), ' ...'; ?></p>
            <p><a class="search-result-label label-event" href="/debate/events"><?php echo $labels['event']; ?></a></p>
        </div>
    </div>
</div>
<?php endif; ?>

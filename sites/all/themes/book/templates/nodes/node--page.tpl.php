<?php

/**
 * @file
 * LandPortal template to display a page node.  This template has two variants
 * depending on the type of view.
 *  - If the view is 'full' the template will render entirely, with header, footer,
 *    breadcrumbs, and all node content.
 *  - If the view is 'teaser' the template will render only the node title, url
 *    a snippet of the content and a smapll label indicanting that it is a page.
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
<?php get_template("search-header", "page", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li class="active"><?php echo $title; ?></li>
  </ol>
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
    <div class="col-sm-9">
      <header class="entry-header">
        <!-- Related topics -->
        <div class="topics">
          <?php print render($content["field_related_topics"]); ?>
        </div>
        <!-- Author and date -->
        <div class="user date">
            <?php echo $labels["written_by"]; ?>
            <a href="/user/<?php echo $uid; ?>" class="user">
                <?php $user_fields = user_load(intval($uid)); ?>
                <?php if (isset ($user_fields->field_firstname)): ?>
                    <?php echo $user_fields->field_firstname['und'][0]['safe_value']; ?>
                    <?php echo ' '; ?>
                    <?php echo $user_fields->field_lastname['und'][0]['safe_value']; ?>
                <?php else: ?>
                    <?php echo $user_fields->name; ?>
                <?php endif; ?>
            </a>
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
<?php $body = $node->body['und'][0]['safe_value']; ?>

<!-- See node-debate.tpl.php for an explanation -->
    <?php if ($view_mode !== 'user-profile'): ?>
      <div class=' container'>
    <?php endif; ?>
      <div class="row search-result">
          <div class="col-sm-12">
              <?php $url = "/node/$node_id"; ?>
              <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
              <a class="url" href="<?php echo $url; ?>"><?php echo "http://".$_SERVER['HTTP_HOST'].$url; ?></a>
              <p class="description"><?php echo substr($body, 0, 300), ' ...'; ?></p>
              <p><a class="search-result-label label-page" href="/debate/"><?php echo $labels['page']; ?></a></p>
          </div>
      </div>
    <?php if ($view_mode !== 'user-profile'): ?>
      </div>
    <?php endif; ?>
<?php endif; ?>

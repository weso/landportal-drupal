<?php

/**
 * @file
 * LandPortal template to display a blog post node.  This template has two variants
 * depending on the type of view.
 *  - If the view is 'full' the template will render entirely, with header, footer,
 *    breadcrumbs, and all node content.
 *  - If the view is 'teaser' the template will render only the node title, url
 *    a snippet of the content and a smapll label indicanting that it is a blog post.
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
<?php get_template("debate-header", "blog", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/blog"><?php echo $labels["blog"]; ?></a></li>
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
    <div class="col-sm-3">
      <div class="image">
        <?php print render($content["field_image"]); ?>
      </div>
      <!-- Share buttons -->
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
      <!-- Comments -->
      <div class="entry-comments">
        <h2 class="section">
          <?php if ($comment_count > 0): ?>
            <span><?php echo $labels["user_comments"]; ?></span>
          <?php else: ?>
            <span><?php echo "CURRENTLY THERE ARE NO COMMENTS"; ?></span>
          <?php endif; ?>
        </h2>
        <?php
          // Remove the "Add new comment" link on the teaser page or if the comment
          // form is being displayed on the same page.
          if ($teaser || !empty($content['comments']['comment_form'])) {
            unset($content['links']['comment']['#links']['comment-add']);
          }
        ?>
        <?php print render($content['comments']); ?>
      </div>
    </div>
  </div>
</div>
<?php get_template("footer", "events", $application_data, $theme_path); ?>

<!-- RESUMED VIEW -->
<?php else: ?>
<?php $body = $node->body['und'][0]['value']; ?>

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
              <p><a class="search-result-label label-blog-post" href="/debate/blog"><?php echo $labels['blog_post']; ?></a></p>
          </div>
      </div>
    <?php if ($view_mode === 'full'): ?>
      </div>
    <?php endif; ?>
<?php endif; ?>

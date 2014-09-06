<?php

/**
 * @file
 * LandPortal template to display a debate node.  This template has two variants
 * depending on the type of view.
 *  - If the view is 'full' the template will render entirely, with header, footer,
 *    breadcrumbs, and all node content.
 *  - If the view is 'teaser' the template will render only the node title, url
 *    a snippet of the content and a smapll label indicanting that it is a debate.
 */
?>

<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $node_id = $node->nid; ?>
<?php global $user; ?>
<?php $can_edit = $is_admin || ($logged_in && $user->uid === $uid); ?>
<?php $can_delete = $is_admin; ?>
<?php $field_date_begining = strtotime($node->field_date["und"]["0"]["value"]); ?>
<?php $field_date_end = strtotime($node->field_date["und"]["0"]["value2"]); ?>
<?php 
  // Translate the debate status
  $status = $content['field_status'][0]['#title'];
  $status = strtolower($status);
  $status = str_replace(' ', '_', $status);
  ?>




<!-- FULL VIEW -->
<?php if ($view_mode === 'full'): ?>
<?php get_template("debate-header", "debates", $application_data, $theme_path); ?>
<div class="content main-content container">
  <!-- Breadcrumbs -->
  <ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
    <li><a href="/debate/debates"><?php echo $labels["debates"]; ?></a></li>
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
      <div class="col-sm-3">
        <div class="image">
          <?php print render($content["field_image"]); ?>
        </div>
        <div class="debate-status <?php echo $status; ?>">
          <span><?php print $labels[$status]; ?></span>
        </div>
        <div class="event-date">
          <h2 class="section">
            <span><?php echo $labels["date"]; ?></span>
          </h2>
          <?php echo $labels["from"], " ", date($labels["date_format"], $field_date_begining)?>
          <br>
          <?php echo $labels["to"], " ", date($labels["date_format"], $field_date_end)?>
        </div>
        <div class="facilitator">
          <h2 class="section">
            <span><?php echo $labels["facilitated_by"]; ?></span>
          </h2>
          <div>
            <?php print theme('user_picture', array('account' =>user_load($uid))); ?>
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
          </div>
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
        <!-- Related topics -->
        <header class="entry-header">
          <div class="topics">
            <?php print render($content["field_related_topics"]); ?>
          </div>
          <div class="entry-language">
            <?php echo $labels["language"], ":"; ?>
            <?php print render($content["field_language"]); ?>
          </div>
          <!-- Related region -->
          <div class="related-region">
            <?php echo $labels["world_region"], ":"; ?>
            <?php print render($content["field_related_region"]); ?>
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
              <span><?php echo $labels["no_comments"]; ?></span>
            <?php endif; ?>
          </h2>
          <?php
            // Remove the "Add new comment" link on the teaser page or if the comment
            // form is being displayed on the same page.
            if ($teaser || !empty($content['comments']['comment_form'])) {
              unset($content['links']['comment']['#links']['comment-add']);
            }
          ?>
          <?php if ($comment_count > 0 || $logged_in): ?>
            <?php print render($content['comments']); ?>
          <?php else: ?>
            <p>
              <a href="/user/login"><?php print($labels['login']); ?></a>
              <?php echo " ", $labels['or'], " "; ?>
              <a href="/user/register"><?php print($labels["signup"]); ?></a>
              <?php echo " ", $labels['to_post_comments'], "."; ?>
            </p>
          <?php endif; ?>
          
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <!-- Twitter timeline -->
      <a class="twitter-timeline" href="https://twitter.com/search?q=%23landportal" data-widget-id="470981258374180864"><?php echo $labels["tweets_related"], " ", "#landportal"; ?></a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </div>
  </div>
</div>
<?php get_template("footer", "debate", $application_data, $theme_path); ?>

<!-- RESUMED VIEW -->
<?php else: ?>
  <?php $body = $node->body['und'][0]['safe_value']; ?>
  <?php //The container div is only needed for the taxonomy view.
        //When the node is loaded from the user-profile
        //view this container is nod needed.
  ?>
    <?php if ($view_mode !== 'user-profile'): ?>
      <div class=' container'>
    <?php endif; ?>
        <div class="row search-result">
            <div class="col-sm-12">
                <?php $url = "/node/$node_id"; ?>
                <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
                <a class="url" href="<?php echo $url; ?>"><?php echo "http://".$_SERVER['HTTP_HOST'].$url; ?></a>
                <p class="description"><?php echo substr($body, 0, 300), ' ...'; ?></p>
                <p><a class="search-result-label label-debate" href="/debate/debates"><?php echo $labels['debate']; ?></a></p>
            </div>
        </div>
    <?php if ($view_mode !== 'user-profile'): ?>
      </div>
    <?php endif; ?>
<?php endif; ?>

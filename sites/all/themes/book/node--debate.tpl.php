<?php

/**
 * @file
 * Bartik's theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */
?>
<?php include_once("template-loader.php");
  get_template("debate-header", "debates", $application_data, $theme_path);
  $labels = get_labels($application_data['languages']);
  // We conver the field_date of the current node into a UNIX timestamp in order
  // to show it internationalized depending on the language that the user has
  // selected.
  $field_date_begining = strtotime($node->field_date["und"]["0"]["value"]);
  $field_date_end = strtotime($node->field_date["und"]["0"]["value2"]);
?>
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
      <h1 class="country-name">
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
        <div class="debate-status"><?php print render($content["field_status"]); ?></div>
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
          <!-- <?php print render($user_picture); ?> -->
          <?php echo render($name); ?>
        </div>
        <div class="social-buttons">
          <h2 class="section">
            <span><?php echo $labels["share"]; ?></span>
          </h2>
          <script src="<?php echo "{$theme_path}/js/share.js"; ?>"></script>
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
            <span><?php echo $labels["user_comments"]; ?></span>
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
    <div class="col-sm-3">
      <!-- Twitter timeline -->
      <a class="twitter-timeline" href="https://twitter.com/search?q=%23landportal" data-widget-id="470981258374180864"><?php echo $labels["tweets_related"], " ", "#landportal"; ?></a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </div>
  </div>
</div>
<?php get_template("footer", "debate", $application_data, $theme_path); ?>

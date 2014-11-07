<?php
/**
* This is the default view for showing the comments in the debate views.
*/
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<div class="row">
  <div class="col-sm-12">
    <!-- Comment title -->
    <h4><?php echo $title; ?></h4>
    <!-- Comment author -->
    <div class="comment-author">
      <?php echo $labels["written_by"], " ", $author; ?>
      <?php echo $labels["on"], " ", date($labels["date_format"], $comment->created); ?>
    </div>
    <!-- Comment body -->
    <div class="content"<?php print $content_attributes; ?>>
      <?php
        // We hide the comments and links now so that we can render them later.
        hide($content['links']);
        print render($content);

        //echo $comment->comment_body["und"]["0"]["value"];
      ?>
    </div> <!-- /.content -->

    <!-- Comment links -->
      <div class="row comment-links">
        <div class="col-sm-12">
          <?php print render($content["links"]); ?>
        </div>
      </div>
  </div>
</div>

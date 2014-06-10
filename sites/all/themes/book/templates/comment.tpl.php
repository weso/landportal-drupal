<?php
/**
* This is the default view for showing the comments in the debate views.
*/
?>
<?php include_once("template-loader.php");
  $labels = get_labels($application_data['languages']);
?>
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
    <p><?php echo $comment->comment_body["und"]["0"]["value"]; ?></p>
    <!-- Comment links -->
      <div class="row comment-links">
        <div class="col-sm-12">
          <?php print render($content["links"]); ?>
        </div>
      </div>
  </div>
</div>

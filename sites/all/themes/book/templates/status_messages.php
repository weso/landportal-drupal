<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php 
function get_message($msg) {
      return $msg;
}
?>



<?php $all_msgs = drupal_get_messages(NULL, TRUE); ?>

<div class="status_messages">
<?php foreach ($all_msgs as $type => $messages): ?>
  <?php if(!$is_admin && ($type == 'error' || $type == 'warning')): ?>
    <?php continue; ?>
  <?php endif; ?>
  <div class="messages_<?php echo $type;?>">
    <?php foreach($messages as $msg): ?>
      <li><?php echo get_message($msg); ?></li>
    <?php endforeach; ?>
  </div>
<?php endforeach; ?>
</div>


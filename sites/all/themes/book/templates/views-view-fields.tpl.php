<?php

/**
 * This template is called by default for rendering the old nodes in the 
 * debates, events, news, organizations and blog views.  Only shows the title
 * and the creation date.
 */
?>
<div class="row small-field-entry">
  <div class="col-sm-2">
    <div class="date">
      <?php if(array_key_exists("field_date", $fields)): ?>
        <?php print $fields["field_date"]->content; ?>
      <?php else: ?>
        <?php print $fields["created"]->content; ?>
      <?php endif; ?>
    </div>
  </div>
  <div clss="col-sm-10">
    <div class="title">
      <h4><?php print $fields["title"]->content; ?></h4>
    </div>
  </div>
</div>

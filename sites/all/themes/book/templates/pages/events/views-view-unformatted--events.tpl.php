<?php

/**
 * This view renders the two most recent events side by side.
 *
 * This view calls automatically the 'views-view-fields--events' template for
 * rendering each event information.
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<div class="row">
  <?php for ($i = 0; $i < count($rows); $i++): ?>
      <div class="col-sm-6">
        <?php print $rows[$i]; ?>
      </div>
  <?php endfor; ?>
</div>

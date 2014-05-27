<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
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

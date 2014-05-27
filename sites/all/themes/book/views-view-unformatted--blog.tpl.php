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

<?php if (count($rows) > 0): ?>
  <div class="row">
    <div class="col-sm-12">
      <?php print $rows[0]; ?>
    </div>
  </div>
<?php endif; ?>

<div class="row second-and-third">
  <?php for ($i = 1; $i < count($rows); $i++): ?>
      <div class="col-sm-6">
        <?php print $rows[$i]; ?>
      </div>
  <?php endfor; ?>
</div>

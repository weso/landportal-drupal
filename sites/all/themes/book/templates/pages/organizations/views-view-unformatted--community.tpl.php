<?php
/**
 * This template shows 9 community organizations in a grid of size 3x3.
 *
 * It calls automatically the template 'views-view-fields-community' for rendering
 * each template.
 */
?>

<!-- First row -->
<div class="row">
  <?php for ($i = 0; $i < 3; $i++): ?>
    <div class="col-sm-4">
      <?php if ($i < count($rows)): ?>
        <?php print $rows[$i]; ?>
      <?php endif; ?>
    </div>
  <?php endfor; ?>
</div>
<!-- Second row -->
<div class="row">
  <?php for ($i = 3; $i < 6; $i++): ?>
    <div class="col-sm-4">
      <?php if ($i < count($rows)): ?>
        <?php print $rows[$i]; ?>
      <?php endif; ?>
    </div>
  <?php endfor; ?>
</div>
<!-- Third row -->
<div class="row">
  <?php for ($i = 6; $i < 9; $i++): ?>
    <div class="col-sm-4">
      <?php if ($i < count($rows)): ?>
        <?php print $rows[$i]; ?>
      <?php endif; ?>
    </div>
  <?php endfor; ?>
</div>

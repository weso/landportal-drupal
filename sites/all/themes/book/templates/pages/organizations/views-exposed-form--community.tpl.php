<?php

/**
* This template renders the search form present in the community view.
*/
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php if (!empty($q)): ?>
  <?php
  // This ensures that, if clean URLs are off, the 'q' is added first so that
  // it shows up first in the URL.
  print $q;
  ?>
<?php endif; ?>
  <div class="views-exposed-form">
    <div class="views-exposed-widgets clearfix">
    <?php foreach ($widgets as $id => $widget): ?>
      <div id="<?php print $widget->id; ?>-wrapper" class="views-exposed-widget views-widget-<?php print $id; ?>">
        <label for="<?php print $widget->id; ?>">
          <?php if (array_key_exists($widget->id, $labels)): ?>
            <?php echo $labels[$widget->id]; ?>
          <?php elseif (!empty($widget->label)): ?>
            <?php print $widget->label; ?>
          <?php endif; ?>
        </label>
      <!-- <?php if (!empty($widget->label)): ?>
        <label for="<?php print $widget->id; ?>">
          <?php if (array_key_exists($widget->id, $labels)): ?>
            <?php echo $labels[$widget->id]; ?>
          <?php else: ?>
            <?php print $widget->label; ?>
          <?php endif; ?>
        </label>
      <?php endif; ?> -->
      <?php if (!empty($widget->operator)): ?>
        <div class="views-operator">
          <?php print $widget->operator; ?>
        </div>
      <?php endif; ?>
      <div class="views-widget">
        <?php print $widget->widget; ?>
      </div>
      <?php if (!empty($widget->description)): ?>
        <div class="description">
          <?php print $widget->description; ?>
        </div>
      <?php endif; ?>
      </div>
    <?php endforeach; ?>
    <?php if (!empty($sort_by)): ?>
      <div class="views-exposed-widget views-widget-sort-by">
        <?php print $sort_by; ?>
      </div>
      <div class="views-exposed-widget views-widget-sort-order">
        <?php print $sort_order; ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($items_per_page)): ?>
      <div class="views-exposed-widget views-widget-per-page">
        <?php print $items_per_page; ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($offset)): ?>
      <div class="views-exposed-widget views-widget-offset">
        <?php print $offset; ?>
      </div>
    <?php endif; ?>
    <div class="views-exposed-widget views-submit-button">
      <!-- <?php print $button; ?> -->
      <button id="edit-submit-community" class="btn data-button"><?php echo $labels['search']; ?></button>
    </div>
    <?php if (!empty($reset_button)): ?>
      <div class="views-exposed-widget views-reset-button">
        <?php print $reset_button; ?>
      </div>
    <?php endif; ?>
    </div>
  </div>

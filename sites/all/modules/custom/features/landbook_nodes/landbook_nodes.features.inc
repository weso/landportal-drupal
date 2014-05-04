<?php
/**
 * @file
 * landbook_nodes.features.inc
 */

/**
 * Implements hook_node_info().
 */
function landbook_nodes_node_info() {
  $items = array(
    'landbook_country' => array(
      'name' => t('LandBook Country'),
      'base' => 'node_content',
      'description' => t('Countries for the LandBook'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
    'landbook_indicator' => array(
      'name' => t('LandBook Indicator'),
      'base' => 'node_content',
      'description' => t('Indicators for the LandBook'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
  );
  return $items;
}

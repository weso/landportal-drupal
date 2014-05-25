<?php
/**
 * @file
 * landdebate_content_types.features.inc
 */

/**
 * Implements hook_node_info().
 */
function landdebate_content_types_node_info() {
  $items = array(
    'blog_post' => array(
      'name' => t('Blog post'),
      'base' => 'node_content',
      'description' => t('A post in the LandPortal Blog'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'debate' => array(
      'name' => t('Debate'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'event' => array(
      'name' => t('Event'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'news' => array(
      'name' => t('News'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'organization' => array(
      'name' => t('Organization'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

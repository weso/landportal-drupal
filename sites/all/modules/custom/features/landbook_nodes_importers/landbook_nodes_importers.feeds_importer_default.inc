<?php
/**
 * @file
 * landbook_nodes_importers.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function landbook_nodes_importers_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'landbook_country_importer';
  $feeds_importer->config = array(
    'name' => 'LandBook Country Importer',
    'description' => 'Importer for the LandBook countries',
    'fetcher' => array(
      'plugin_key' => 'FeedsSQLFetcher',
      'config' => array(
        'databases' => array(
          'landbook_db' => 'landbook_db',
          'default' => 0,
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsSQLParser',
      'config' => array(
        'query' => 'SELECT DISTINCT(regionTranslations.name) as name, countries.iso3 as iso3
FROM regionTranslations
INNER JOIN countries
ON regionTranslations.region_id = countries.id',
        'database' => 'landbook_db',
        'mapping' => array(
          'iso3' => 'iso3',
          'name' => 'name',
        ),
        'results' => '',
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '604800',
        'author' => 0,
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'name',
            'target' => 'title',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'iso3',
            'target' => 'field_id',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '1',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'landbook_country',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '604800',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['landbook_country_importer'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'landbook_indicator_importer';
  $feeds_importer->config = array(
    'name' => 'LandBook Indicator Importer',
    'description' => 'Importer for the LandBook indicators',
    'fetcher' => array(
      'plugin_key' => 'FeedsSQLFetcher',
      'config' => array(
        'databases' => array(
          'landbook_db' => 'landbook_db',
          'default' => 0,
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsSQLParser',
      'config' => array(
        'query' => 'SELECT DISTINCT(indicatorTranslations.name) as name, indicatorTranslations.description as description, indicators.id as id
FROM indicatorTranslations
INNER JOIN indicators
ON indicatorTranslations.indicator_id = indicators.id',
        'database' => 'landbook_db',
        'mapping' => array(
          'description' => 'description',
          'id' => 'id',
          'name' => 'name',
        ),
        'results' => '',
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '604800',
        'author' => 0,
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'name',
            'target' => 'title',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'id',
            'target' => 'field_id',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'description',
            'target' => 'field_description',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '1',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'landbook_indicator',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '604800',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['landbook_indicator_importer'] = $feeds_importer;

  return $export;
}

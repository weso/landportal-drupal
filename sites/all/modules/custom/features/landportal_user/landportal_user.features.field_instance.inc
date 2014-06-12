<?php
/**
 * @file
 * landportal_user.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function landportal_user_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'user-user-field_related_continents'
  $field_instances['user-user-field_related_continents'] = array(
    'bundle' => 'user',
    'default_value' => array(
      0 => array(
        'tid' => 1877,
        'vid' => 2,
        'name' => 'Global',
        'description' => '',
        'format' => 'plain_text',
        'weight' => 0,
        'language' => 'und',
        'i18n_tsid' => 0,
        'vocabulary_machine_name' => 'continents',
        'rdf_mapping' => array(
          'description' => array(
            'predicates' => array(
              0 => 'skos:definition',
            ),
          ),
          'name' => array(
            'predicates' => array(
              0 => 'rdfs:label',
              1 => 'skos:prefLabel',
            ),
          ),
          'parent' => array(
            'predicates' => array(
              0 => 'skos:broader',
            ),
            'type' => 'rel',
          ),
          'rdftype' => array(
            0 => 'skos:Concept',
          ),
          'vid' => array(
            'predicates' => array(
              0 => 'skos:inScheme',
            ),
            'type' => 'rel',
          ),
        ),
      ),
    ),
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'i18n_taxonomy',
        'settings' => array(),
        'type' => 'i18n_taxonomy_term_reference_link',
        'weight' => 3,
      ),
    ),
    'entity_type' => 'user',
    'field_name' => 'field_related_continents',
    'label' => 'Related continents',
    'required' => 0,
    'settings' => array(
      'user_register_form' => 1,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'taxonomy',
      'settings' => array(
        'autocomplete_path' => 'taxonomy/autocomplete',
        'size' => 60,
      ),
      'type' => 'taxonomy_autocomplete',
      'weight' => 11,
    ),
  );

  // Exported field_instance: 'user-user-field_related_countries'
  $field_instances['user-user-field_related_countries'] = array(
    'bundle' => 'user',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'i18n_taxonomy',
        'settings' => array(),
        'type' => 'i18n_taxonomy_term_reference_link',
        'weight' => 4,
      ),
    ),
    'entity_type' => 'user',
    'field_name' => 'field_related_countries',
    'label' => 'Related countries',
    'required' => 0,
    'settings' => array(
      'user_register_form' => 1,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'taxonomy',
      'settings' => array(
        'autocomplete_path' => 'taxonomy/autocomplete',
        'size' => 60,
      ),
      'type' => 'taxonomy_autocomplete',
      'weight' => 13,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Related continents');
  t('Related countries');

  return $field_instances;
}

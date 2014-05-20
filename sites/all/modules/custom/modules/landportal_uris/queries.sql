-- Observacion no nula y más reciente para un determinado conjunto de indicadores y país

SELECT obs.id, inter1.value AS ref_time_value,
  countries.iso3,
  countries.iso2,
  countries.faoURI,
  regionTranslations.name AS country_name,
  ind.id AS ind_id,
  ind.last_update AS ind_last_update,
  ind.preferable_tendency AS ind_preferable_tendency,
  ind.starred AS ind_starred,
  indicatorTranslations.name AS ind_name,
  indicatorTranslations.description AS ind_description,
  vals1.value AS value
FROM observations obs
INNER JOIN intervals inter1 ON inter1.id = obs.ref_time_id
INNER JOIN countries ON countries.id = obs.region_id
INNER JOIN regionTranslations ON regionTranslations.region_id = countries.id
INNER JOIN landportal.values vals1 ON vals1.id = obs.value_id
INNER JOIN indicators ind ON ind.id = obs.indicator_id
INNER JOIN indicatorTranslations ON indicatorTranslations.indicator_id = ind.id
INNER JOIN (
  SELECT obs2.indicator_id, MAX( inter2.value) AS max_val
  FROM observations obs2
  INNER JOIN intervals inter2 ON obs2.ref_time_id = inter2.id
  INNER JOIN landportal.values vals2 ON obs2.value_id = vals2.id
  WHERE vals2.value IS NOT NULL
  GROUP BY obs2.indicator_id
) sub ON (obs.indicator_id = sub.indicator_id AND inter1.value = max_val)
WHERE countries.iso3 = 'ESP'
  AND obs.indicator_id IN ('INDWB10', 'INDWB9', 'INDWB6', 'INDWB13', 'INDWB12', 'INDWB14', 'INDWB11')
  AND vals1.value IS NOT NULL
  AND regionTranslations.lang_code = 'en'
  AND indicatorTranslations.lang_code = 'en'

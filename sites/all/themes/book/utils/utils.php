<?php

/**
 * Translates the form titles and buttons.
 *
 * @param $translations array in which keys are the elements to translate in
 *    the form and values are the translations.
 * @param $form form in which the translation is made. The form is passed by
 *    reference.
 */
function translate_form_titles(&$form, $translations) {
  foreach ($translations as $key => $value):
    _replace_form_title($form, $key, $value);
  endforeach;
}

/**
 * Replaces the $field_name title in $form with the desired $title.
 * The $form is passed by reference, so the replaced is made
 * in situ.
 */
function _replace_form_title(&$form, $field_name, $title) {
  if ($field_name == "body"):
    $form["body"]["und"]["0"]["value"]["#title"] = $title;
  elseif ($field_name == "submit"):
    $form["actions"]["submit"]["#value"] = $title;
  elseif ($field_name == "field_image_button"):
    $form["field_image"]["und"]["0"]["upload_button"]["#value"] = $title;
  else:
    $form[$field_name]["#title"] = $title;
    $form[$field_name]["und"]["#title"] = $title;
    $form[$field_name]["und"]["0"]["#title"] = $title;
  endif;
}

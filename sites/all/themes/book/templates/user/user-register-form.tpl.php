<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<!-- USERNAME TRANSLATIONS -->
<?php $form['account']['name']['#title'] = $labels['username']; ?>
<?php $form['account']['name']['#description'] = $labels['username_restrictions']; ?>
<!-- EMAIL TRANSLATIONS -->
<?php $form['account']['mail']['#title'] = $labels['email']; ?>
<?php $form['account']['mail']['#description'] = $labels['email_restrictions']; ?>
<!-- FIRST NAME TRANSLATIONS -->
<?php $form['field_firstname']['und']['#title'] = $labels['first_name']; ?>
<?php $form['field_firstname']['und']['0']['#title'] = $labels['first_name']; ?>
<?php $form['field_firstname']['und']['0']['value']['#title'] = $labels['first_name']; ?>
<!-- LAST NAME TRANSLATIONS -->
<?php $form['field_lastname']['und']['#title'] = $labels['last_name']; ?>
<?php $form['field_lastname']['und']['0']['#title'] = $labels['last_name']; ?>
<?php $form['field_lastname']['und']['0']['value']['#title'] = $labels['last_name']; ?>
<!-- REGIONS AND INTERESTS -->
<?php $form['field_geographical_focus']['und']['#title'] = $labels['edit-field_geographical_focus-tid']; ?>
<?php $form['field_interests']['und']['#title'] = $labels['edit-field_interests-tid']; ?>
<!-- SUBMIT BUTTON TRANSLATIONS -->
<?php $form['actions']['submit']['#value'] = $labels['new_registration']; ?>
<?php $form['actions']['submit']['#attributes'] = array('class' => array('btn btn btn-success sign-in-button')); ?>

<div class="container login-outer">
    <div class="">
        <div class="main login-wrap">
            <?php get_partial("login-header", "signup", $application_data, $theme_path); ?>
            <div class="login-inner">
                <div class="landbook-register-wrapper">
                  <?php print drupal_render_children($form) ?>
                </div>
            </div>
        </div>
    </div>
</div>

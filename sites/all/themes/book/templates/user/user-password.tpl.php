<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<!-- USERNAME TRANSLATIONS -->
<?php $form['name']['#title'] = $labels['user']; ?>
<!-- SUBMIT BUTTON TRANSLATIONS -->
<?php $form['actions']['submit']['#value'] = $labels['request_password']; ?>
<?php $form['actions']['submit']['#attributes'] = array('class' => array('btn btn btn-success sign-in-button')); ?>

<div class="container login-outer">
    <div class="">
        <div class="main login-wrap">
            <?php get_partial("login-header", "", $application_data, $theme_path); ?>
            <div class="login-inner">
                <div class="landbook-register-wrapper">
                  <?php print drupal_render_children($form) ?>
                </div>
            </div>
        </div>
    </div>
</div>

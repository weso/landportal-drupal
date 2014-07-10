<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<!-- COMMON VARIABLES -->
<?php
	$user_to_edit = $form['#user'];
	// Form customizations
	$form['account']['current_pass']['#title'] = $labels['enter-password'];
	unset($form['account']['current_pass']['#description']);
	$form['account']['mail']['#title'] = $labels['email'];
	unset($form['account']['mail']['#description']);
	$form['account']['pass']['pass1']['#title'] = $labels['new_password'];
	$form['account']['pass']['pass2']['#title'] = $labels['repeat_password'];
	$form['account']['pass']['#attached']['js']['1']['data']['password']['strengthTitle'] = $labels['strength_password'];
	unset($form['account']['pass']['#description']);
	$form['locale']['#type'] = 'value';
	unset($form['locale']['#title']);
	$form['locale']['language']['#title'] = $labels['language'];
	unset($form['timezone']['#title']);
	$form['timezone']['#access'] = FALSE;
	$form['field_firstname']['und']['#title'] = $labels['first_name'];
	$form['field_firstname']['und']['0']['#title'] = $labels['first_name'];
	$form['field_firstname']['und']['0']['value']['#title'] = $labels['first_name'];
	$form['field_lastname']['und']['#title'] = $labels['last_name'];
	$form['field_lastname']['und']['0']['#title'] = $labels['last_name'];
	$form['field_lastname']['und']['0']['value']['#title'] = $labels['last_name'];
	$form['field_geographical_focus']['und']['#title'] = $labels['edit-field_geographical_focus-tid'];
	$form['field_interests']['und']['#title'] = $labels['edit-field_interests-tid'];
	$form['picture']['picture_upload']['#title'] = $labels['image'];
	unset($form['picture']['picture_upload']['#description']);
	unset($form['picture']['#title']);
	$form['actions']['submit']['#value'] = $labels['update_profile'];
	$form['actions']['submit']['#attributes'] = array('class' => array('btn btn btn-success sign-in-button'));
?>

<!-- HEADER -->
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>

<div class="content main-content container">
	<!-- Breadcrumbs -->
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li><a href="/debate/community"><?php echo $labels["community"]; ?></a></li>
        <li><a href="/user/<?php echo $user_to_edit->uid; ?>"><?php echo $user_to_edit->name; ?></a></li>
        <li class="active"><?php echo $labels['edit']; ?></li>
    </ol>
    <!-- Form -->
    <div class="row">
    	<div class="col-sm-12">
    		<?php print drupal_render_children($form); ?>
    	</div>
    </div>
</div>

<!-- FOOTER -->
<?php get_template("footer", "events", $application_data, $theme_path); ?>

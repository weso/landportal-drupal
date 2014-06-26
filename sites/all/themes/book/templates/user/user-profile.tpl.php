<?php

/**
* @file
* Default theme implementation to present all user profile data.
*
* This template is used when viewing a registered member's profile page,
* e.g., example.com/user/123. 123 being the users ID.
*
* Use render($user_profile) to print all profile items, or print a subset
* such as render($user_profile['user_picture']). Always call
* render($user_profile) at the end in order to print all remaining items. If
* the item is a category, it will contain all its profile items. By default,
* $user_profile['summary'] is provided, which contains data on the user's
* history. Other data can be included by modules. $user_profile['user_picture']
* is available for showing the account picture.
*
* Available variables:
* - $user_profile: An array of profile items. Use render() to print them.
* - Field variables: for each field instance attached to the user a
* corresponding variable is defined; e.g., $account->field_example has a
* variable $field_example defined. When needing to access a field's raw
* values, developers/themers are strongly encouraged to use these
* variables. Otherwise they will have to explicitly specify the desired
* field language, e.g. $account->field_example['en'], thus overriding any
* language negotiation rule that was previously applied.
*
* @see user-profile-category.tpl.php
* Where the html is handled for the group.
* @see user-profile-item.tpl.php
* Where the html is handled for each item in the group.
* @see template_preprocess_user_profile()
*
* @ingroup themeable
*/
?>


<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php $firstname = isset($user_profile['field_firstname']['#items']['0']['safe_value']) ?
        $user_profile['field_firstname']['#items']['0']['safe_value'] : ""; ?>
<?php $lastname = isset($user_profile['field_lastname']['#items']['0']['safe_value']) ?
        $user_profile['field_lastname']['#items']['0']['safe_value'] : ""; ?>
<?php $api_token = isset($user_profile['field_api_token']['#items']['0']['safe_value']) ?
        $user_profile['field_api_token']['#items']['0']['safe_value'] : ""; ?>
<?php $username = isset($user_profile['field_firstname']['#object']->name) ?
        $user_profile['field_firstname']['#object']->name : ""; ?>
<?php $created = isset($user_profile['field_firstname']['#object']->created) ?
        $user_profile['field_firstname']['#object']->created : ""; ?>
<?php $email = isset($user_profile['field_firstname']['#object']->mail) ?
        $user_profile['field_firstname']['#object']->mail : ""; ?>
<?php $can_access_api = isset($user_profile['field_api_token']) ?
        in_array('access API', $user_profile['field_firstname']['#object']->roles)
        : false; ?>
<?php $viewed_uid = $user_profile['field_firstname']['#object']->uid; ?>
<?php $can_edit = ($user->uid == $viewed_uid) || $is_admin; ?>

<!-- HEADER -->
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>

<!-- CONTENT -->
<div class="content main-content container">
    <!-- Breadcrumbs -->
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li><a href="/debate/community"><?php echo $labels["community"]; ?></a></li>
        <li class="active"><?php echo $username; ?></li>
    </ol>
    <div class="row">
        <div class="col-sm-12">
            <h1>
                <span class="country-name">
                    <?php echo $username; ?>
                </span>
            </h1>
        </div>
    </div>
    <div class="row">
        <!-- User data -->
        <div class="col-sm-10">
            <div class="user-firstname">
                <h2><?php echo $labels['first_name']; ?></h2>
                <?php if ($firstname !== ""): ?>
                    <p><?php echo $firstname; ?></p>
                <?php else: ?>
                    <p><?php $labels['no_firstname']; ?></p>
                <?php endif; ?>
            </div>
            <div class="user-lastname">
                <h2><?php echo $labels['last_name']; ?></h2>
                <?php if ($lastname !== ""): ?>
                    <p><?php echo $lastname; ?></p>
                <?php else: ?>
                    <p><?php $labels['no_lastname']; ?></p>
                <?php endif; ?>
            </div>
            <div class="user-email">
                <h2><?php echo $labels['email']; ?></h2>
                <?php if ($email !== ""): ?>
                    <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a>
                <?php else: ?>
                    <p><?php $labels['no_email']; ?></p>
                <?php endif; ?>
            </div>
            <?php if ($can_access_api): ?>
            <div class="user-api-token">
                <h2><?php echo $labels['api_access_token']; ?></h2>
                <?php if ($api_token !== ""): ?>
                    <pre><?php echo $api_token; ?></pre>
                <?php else: ?>
                    <p><?php $labels['no_api_access_token']; ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>
            <div class="user-member-since">
                <h2><?php echo $labels['member_since']; ?></h2>
                <?php if ($created !== ""): ?>
                    <p><?php echo date($labels["date_format"], $created); ?></p>
                <?php else: ?>
                    <p><?php $labels['no_member-since']; ?></p>
                <?php endif; ?>
            </div>
        </div>
        <!-- User picture -->
        <div class="col-sm-2">
            <div class="row user-image">
                <div class="col-sm-12">
                    <?php print theme('user_picture', array('account' =>user_load_by_name($username))); ?>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <?php $user_profile['field_related_countries']['#title'] = $labels['edit-field-related-countries-tid']; ?>
                    <?php print render($user_profile['field_related_countries']); ?>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <?php $user_profile['field_related_continents']['#title'] = $labels['edit-field-related-continents-tid']; ?>
                    <?php print render($user_profile['field_related_continents']); ?>
                </div>
            </div>
            <?php if($can_edit): ?>
                <div class="user-profile-edit-button">
                    <a href="/user/<?php echo $viewed_uid;?>/edit">
                        <button class="btn data-button"><?php echo $labels['edit']; ?></button>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<!-- FOOTER -->
<?php get_template("footer", "events", $application_data, $theme_path); ?>

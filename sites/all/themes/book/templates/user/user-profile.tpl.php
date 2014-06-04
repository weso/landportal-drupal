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
<!-- HEADER -->
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>
<!-- CONTENT -->
<?php $firstname = $user_profile['field_firstname']['#items']['0']['safe_value']; ?>
<?php $lastname = $user_profile['field_lastname']['#items']['0']['safe_value']; ?>
<?php $api_token = $user_profile['field_api_token']['#items']['0']['safe_value']; ?>
<?php $username = $user_profile['field_firstname']['#object']->name; ?>
<?php $created = $user_profile['field_firstname']['#object']->created; ?>
<div class="content main-content container">
    <!-- Breadcrumbs -->
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li><a href="/debate/community"><?php echo $labels["community"]; ?></a></li>
        <li class="active"><?php echo $username; ?></li>
    </ol>
    <div class="row">
        <!-- User data -->
        <div class="col-sm-9">
            <h1>
                <span class="country-name">
                    <?php echo $username; ?>
                </span>
            </h1>
            <div class="user-firstname">
                <h2><?php echo $labels['first_name']; ?></h2>
                <p><?php echo $firstname; ?></p>
            </div>
            <div class="user-lastname">
                <h2><?php echo $labels['last_name']; ?></h2>
                <p><?php echo $lastname; ?></p>
            </div>
            <div class="user-api-token">
                <h2><?php echo $labels['api_access_token']; ?></h2>
                <p><?php echo $api_token; ?></p>
            </div>
            <div class="user-member-since">
                <h2><?php echo $labels['member_since']; ?></h2>
                <p><?php echo date($labels["date_format"], $created); ?></p>
            </div>
        </div>
        <!-- User picture -->
        <div class="col-sm-3">
        </div>
    </div>
</div>
<!-- FOOTER -->
<?php get_template("footer", "events", $application_data, $theme_path); ?>

<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>

<?php
    // The variable $user_id is inserted using the template_preprocess_user_profile
    // function in template.php.
    $viewed_user = user_load($user_id);
    $firstname = $viewed_user->field_firstname['und'][0]['safe_value'];
    $lastname = $viewed_user->field_lastname['und'][0]['safe_value'];
    $api_token = $viewed_user->field_api_token['und'][0]['safe_value'];
    $can_access_api = in_array('access API', $viewed_user->roles);
    $is_own_profile = $user->uid == $viewed_user->uid;
    $can_edit = $is_own_profile || $is_admin;
?>

<!-- HEADER -->
<?php get_template("debate-header", "community", $application_data, $theme_path); ?>

<!-- CONTENT -->
<div class="content main-content container">
    <!-- Breadcrumbs -->
    <ol class="breadcrumb">
        <li><a href="/"><?php echo $labels["index"]; ?></a></li>
        <li><a href="/debate"><?php echo $labels["land_debate"]; ?></a></li>
        <li><a href="/debate/community"><?php echo $labels["community"]; ?></a></li>
        <li class="active"><?php echo $viewed_user->name; ?></li>
    </ol>
    <div class="row">
        <div class="col-sm-12">
            <h1>
                <span class="country-name">
                    <?php echo $viewed_user->name; ?>
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
                    <a href="mailto:<?php echo $viewed_user->mail; ?>"><?php echo $viewed_user->mail; ?></a>
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
                    <?php print theme('user_picture', array('account' =>user_load_by_name($viewed_user->name))); ?>
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
                    <a href="/user/<?php echo $viewed_user->uid;?>/edit">
                        <button class="btn data-button"><?php echo $labels['edit']; ?></button>
                    </a>
                </div>
            <?php endif; ?>
            <?php if($is_own_profile): ?>
                <div class="user-profile-edit-button">
                    <a href="/user/logout">
                        <button class="btn data-button"><?php echo $labels['logout']; ?></button>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<!-- FOOTER -->
<?php get_template("footer", "events", $application_data, $theme_path); ?>

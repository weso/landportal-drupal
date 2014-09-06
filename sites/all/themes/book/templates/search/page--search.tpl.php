<!-- Custom search page for the LandPortal -->

<!-- HEADER -->
<?php require_once(drupal_get_path('theme', 'book') .'/template-loader.php'); ?>
<?php get_template('search-header', 'search', $application_data, $theme_path); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<?php $any_result = isset($page['content']['system_main']['search_results']['#results']); ?>
<!-- Search terms -->
<?php $search_terms = $page['content']['system_main']['search_form']['basic']['keys']['#default_value'] ?
    $page['content']['system_main']['search_form']['basic']['keys']['#default_value'] : ""?>

<div class='content main-content container'>
<!-- BREADCRUMBS -->
<ol class="breadcrumb">
    <li><a href="/"><?php echo $labels["index"]; ?></a></li>
    <li class="active"><?php echo $labels['search']; ?></li>
</ol>
<!-- SEARCH FORM -->
<div class='row'>
    <div class='col-sm-12'>
        <div class='search-forms'>
            <form class="search-form" action="/search/site/" method="post" id="search-form" accept-charset="UTF-8" onSubmit="return landportalSearchListener();">
                <div class="input-group search site-search">
                <input type="text" name="keys" value="<?php echo htmlspecialchars($search_terms); ?>" class="form-control" placeholder="<?php echo $labels['search']; ?>" name="srch-term" id="srch-term">
                    <div class="input-group-btn">
                        <button class="btn" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<div class='row'>
    <!-- SEARCH RESULTS -->
    <?php if ($any_result): ?>
        <div class='col-sm-12'>
            <h2><?php echo $labels['search_results']; ?></h2>
            <?php print render($page['content']['system_main']['search_results']); ?>
        </div>
    <!-- NO SEARCH RESULTS -->
    <?php else: ?>
        <div class='col-sm-12'>
            <h2><?php echo $labels['no_search_results_0']; ?></h2>
            <p><?php echo $labels['no_search_results_1']; ?></p>
            <p><?php echo $labels['no_search_results_2']; ?></p>
            <p><?php echo $labels['no_search_results_3']; ?></p>
        </div>
    <?php endif; ?>
</div>
</div>
<!-- FOOTER -->
<?php get_template('footer', 'events', $application_data, $theme_path); ?>

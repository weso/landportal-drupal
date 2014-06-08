<?php
/**
* @file
* Default theme implementation for displaying a single search result.
*
* This template renders a single search result and is collected into
* search-results.tpl.php. This and the parent template are
* dependent to one another sharing the markup for definition lists.
*
* Available variables:
* - $url: URL of the result.
* - $title: Title of the result.
* - $snippet: A small preview of the result. Does not apply to user searches.
* - $info: String of all the meta information ready for print. Does not apply
* to user searches.
* - $info_split: Contains same data as $info, split into a keyed array.
* - $module: The machine-readable name of the module (tab) being searched, such
* as "node" or "user".
* - $title_prefix (array): An array containing additional output populated by
* modules, intended to be displayed in front of the main title tag that
* appears in the template.
* - $title_suffix (array): An array containing additional output populated by
* modules, intended to be displayed after the main title tag that appears in
* the template.
*
* Default keys within $info_split:
* - $info_split['module']: The module that implemented the search query.
* - $info_split['user']: Author of the node linked to users profile. Depends
* on permission.
* - $info_split['date']: Last update of the node. Short formatted.
* - $info_split['comment']: Number of comments output as "% comments", %
* being the count. Depends on comment.module.
*
* Other variables:
* - $classes_array: Array of HTML class attribute values. It is flattened
* into a string within the variable $classes.
* - $title_attributes_array: Array of HTML attributes for the title. It is
* flattened into a string within the variable $title_attributes.
* - $content_attributes_array: Array of HTML attributes for the content. It is
* flattened into a string within the variable $content_attributes.
*
* Since $info_split is keyed, a direct print of the item is possible.
* This array does not apply to user searches so it is recommended to check
* for its existence before printing. The default keys of 'type', 'user' and
* 'date' always exist for node searches. Modules may provide other data.
* @code
* <?php if (isset($info_split['comment'])): ?>
* <span class="info-comment">
* <?php print $info_split['comment']; ?>
* </span>
* <?php endif; ?>
* @endcode
*
* To check for all available data within $info_split, use the code below.
* @code
* <?php print '<pre>'. check_plain(print_r($info_split, 1)) .'</pre>'; ?>
* @endcode
*
* @see template_preprocess()
* @see template_preprocess_search_result()
* @see template_process()
*
* @ingroup themeable
*/
?>
<?php require_once(drupal_get_path("theme", "book") ."/template-loader.php"); ?>
<?php $labels = get_labels($application_data['languages']); ?>
<!-- Load the node correspondant to the search result. -->
<?php $node_id = $result['node']->entity_id; ?>
<?php $node = node_load($node_id); ?>
<!-- Check of what type is the search result -->
<?php $is_country = $result['bundle'] === 'landbook_country'; ?>
<?php $is_indicator = $result['bundle'] === 'landbook_indicator'; ?>
<?php $is_blog_post = $result['bundle'] === 'blog_post'; ?>
<?php $is_debate = $result['bundle'] === 'debate'; ?>
<?php $is_event = $result['bundle'] === 'event'; ?>
<?php $is_news = $result['bundle'] === 'news'; ?>
<?php $is_organization = $result['bundle'] === 'organization'; ?>


<div class="row search-result">
    <div class="col-sm-12">
        <!-- COUNTRY -->
        <?php if ($is_country): ?>
            <?php $iso3 = $node->field_id['und'][0]['safe_value']; ?>
            <?php $flag = "/sites/all/themes/book/static/images/flags/$iso3.png"; ?>
            <?php $url = "/book/countries/$iso3"; ?>
            <img src="<?php echo $flag; ?>" class="search-result-flag"/>
            <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
            <a class="url" href="<?php echo $url; ?>"><?php echo $url; ?></a>
            <p><a class="search-result-label label-country" href="/book/countries"><?php echo $labels['country']; ?></a></p>
        <!-- INDICATOR -->
        <?php elseif ($is_indicator): ?>
            <?php $ind_id = $node->field_id['und'][0]['safe_value']; ?>
            <?php $url = "/book/indicators/detail?indicator=$ind_id"; ?>
            <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
            <p class="description"><?php echo $snippet; ?></p>
            <p><a class="search-result-label label-indicator" href="/book/indicators"><?php echo $labels['indicator']; ?></a></p>
        <!-- OTHER -->
        <?php else: ?>
            <?php $url = "/node/$node_id"; ?>
            <h3 class="text-left"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
            <a class="url" href="<?php echo $url; ?>"><?php echo $url; ?></a>
            <p class="description"><?php echo $snippet; ?></p>
            <?php if ($is_blog_post): ?>
                <p><a class="search-result-label label-blog-post" href="/debate/blog"><?php echo $labels['blog_post']; ?></a></p>
            <?php elseif ($is_debate): ?>
                <p><a class="search-result-label label-debate" href="/debate/debates"><?php echo $labels['debate']; ?></a></p>
            <?php elseif ($is_event): ?>
                <p><a class="search-result-label label-event" href="/debate/events"><?php echo $labels['event']; ?></a></p>
            <?php elseif ($is_news): ?>
                <p><a class="search-result-label label-news" href="/debate/news"><?php echo $labels['news']; ?></a></p>
            <?php elseif ($is_organization): ?>
                <p><a class="search-result-label label-organization" href="/debate/organizations"><?php echo $labels['organization']; ?></a></p>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>

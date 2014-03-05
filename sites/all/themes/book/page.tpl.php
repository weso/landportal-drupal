<?php 
    session_start();
?>
<?php if ($page['content']): ?>
	<?php print render($page['content']); ?>
<?php endif; ?>


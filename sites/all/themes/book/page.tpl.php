<h1>TITULO</h1>
<?php if ($page['header']): ?>
<div id="header">
	<?php print render($page['header']); ?>
</div>
<?php endif; ?>
<p>SDLAJFLSJFLAJF</p>
<p><?php print t('Probando probando'); ?></p>
<?php if ($page['content']): ?>
<div id="contenido">
	<?php print render($page['content']); ?>
</div>
<?php endif; ?>


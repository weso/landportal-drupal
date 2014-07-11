h1 = document.querySelector('h1');
var content = h1 ? h1.textContent : "";
content = content ? content : document.title;

//Trim the spaces before and after the comment
content = content.trim();

var url = document.URL;

document.write('<div class="row share">');
document.write('	<div class="col-sm-6 text-center">');
document.write('  	<a id="mail-link" href="mailto:?subject=' + content + '&amp;body=' + content + ' ' + url + '" target="_blank">');
document.write('  		<i class="fa fa-envelope fa-3x"></i>');
document.write('  	</a>');
document.write('	</div>');
document.write('	<div class="col-sm-6 text-center">');
document.write('		<a id="twitter-link" href="https://twitter.com/intent/tweet?original_referer=&amp;text=' + content + '&amp;tw_p=tweetbutton&amp;url=' + url + '&amp;via=landportal" target="_blank">');
document.write('			<i class="fa fa-twitter fa-3x"></i>');
document.write('		</a>');
document.write('	</div>');
document.write('</div>');
document.write('<div class="row share">');
document.write('	<div class="col-sm-6 text-center">');
document.write('  	<a id="facebook-link" href="https://www.facebook.com/dialog/feed?app_id=145634995501895&amp;display=popup&amp;caption=' + content + '&amp;link=' + url + '&amp;redirect_uri=https://developers.facebook.com/tools/explorer" target="_blank">');
document.write('	  	<i class="fa fa-facebook fa-3x"></i>');
document.write('		</a>');
document.write('	</div>');
document.write('	<div class="col-sm-6 text-center">');
document.write('  	<a id="linkedin-link" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url + '&amp;title=' + content + '&amp;summary=' + content + '&amp;source=landportal.info" target="_blank">');
document.write('  		<i class="fa fa-linkedin fa-3x"></i>');
document.write('  	</a>');
document.write('	</div>');
document.write('</div>');

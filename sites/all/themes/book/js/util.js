var util = new (function() {
	this.generateShareLinks = function (url, description) {
		generateTwitterLink(url, description);
		generateMailLink(url, description);
		generateFacebookLink(url, description);
		generateLinkedinLink(url, description);
	}

	// Twitter

	function generateTwitterLink(url, description) {
		var link = document.getElementById('twitter-link');

		if (link) {
			link.href = 'https://twitter.com/intent/tweet?original_referer=&text=' + description +

			'&tw_p=tweetbutton&url=' + url + '&via=landportal';
		}
	}

	// Mail

	function generateMailLink(url, description) {
		var link = document.getElementById('mail-link');

		if (link) {
			link.href = 'mailto:?subject=' + description + '&body=' + description + ' ' + url;
		}
	}

	// Facebook

	function generateFacebookLink(url, description) {
		var link = document.getElementById('facebook-link');

		if (link) {
			link.href = 'https://www.facebook.com/dialog/feed?app_id=145634995501895&display=popup&caption=' + description +
						'&link=' + url +
						'&redirect_uri=https://developers.facebook.com/tools/explorer';
		}
	}

	// Linkedin

	function generateLinkedinLink(url, description) {
		var link = document.getElementById('linkedin-link');

		if (link) {
			link.href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url +
						'&title=' + description + '&summary=' + description + '&source=landportal.info';
		}
	}
})();

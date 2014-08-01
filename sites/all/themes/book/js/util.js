var util = new (function() {
	this.mapOnCountryOver =  function(info, visor) {
    if (visor) {
        visor.innerHTML = '';

				var field = "name";

				if (languageCode == "es")
					field = "nombre"
				else if (languageCode == "fr")
					field = "nom"

        var name = document.createElement('span');
        name.innerHTML = info[field];
        name.className = 'name';
        visor.appendChild(name);

        var value = document.createElement('span');
        value.innerHTML = info.value;
        value.className = 'value';
        visor.appendChild(value);
      }
    },
	this.tooltipRegion = function(info) {
		info.pos = info["data-time"];
		util.tooltipIndicator(info);
	},
	this.tooltipIndicator = function(info) {
		var path = document.getElementById('path').value;

		var code = info.serie;
		var value = info.value == null || info.value == "null" ? null : info.value;
		var name = info["data-name"];

		var time = info["pos"] ? info["pos"] : "-";

		var tooltipHeader = String.format('<div class="tooltip-header">{0}</div>',
			name);

		var tooltipBody = String.format('<div class="tooltip-body"><p class="time">{0}</p><p class="value">{1}</p></div>',
			time, value);

		var text = String.format("{0}{1}", tooltipHeader, value != null ? tooltipBody : "");

		wesCountry.charts.showTooltip(text, info.event);
	}

	this.tooltipWidgets = function(info) {
		var path = document.getElementById('path').value;

		var code = info.id;
		var value = info.value == null || info.value == "null" ? null : info.value;
		var name = info["data-name"];

		var language = document.getElementById('selected-language').value;

		var continent = info["data-region"];

		if (continent)
			continent = language && language != "" ? continent[language] : continent["en"];

		var time = info.pos;

		var flagSrc = path + '/static/images/flags/' + code.toUpperCase() + ".png";

		var tooltipHeader = String.format('<div class="tooltip-header"><img src="{0}" /><div class="title"><p class="countryName">{1}</p><p class="continentName">{2}</p></div></div>',
			flagSrc, name, continent);

		var tooltipBody = String.format('<div class="tooltip-body"><p class="time">{0}</p><p class="value">{1}</p></div>',
			time, value);

		var text = String.format("{0}{1}", tooltipHeader, value != null ? tooltipBody : "");

		wesCountry.charts.showTooltip(text, info.event);
	}

	this.tooltipRanking = function(info) {
		var path = document.getElementById('path').value;

		var code = info.serie;
		var value = info.value == null || info.value == "null" ? null : info.value;
		var name = info["data-countryName"];
		var continent = info["data-continent_name"];
		var time = info["data-time"] ? info["data-time"] : "-";
		var ranking = info["data-ranking"] ? info["data-ranking"] : "";

		var flagSrc = path + '/static/images/flags/' + code.toUpperCase() + ".png";

		var tooltipHeader = String.format('<div class="tooltip-header"><img src="{0}" /><div class="title"><p class="countryName">{1}</p><p class="continentName">{2}</p></div></div>',
			flagSrc, name, continent);

		var tooltipBody = String.format('<div class="tooltip-body"><p class="time">{0}</p><p class="ranking">{1}</p><p class="value">{2}</p></div>',
			time, ranking, value);

		var text = String.format("{0}{1}", tooltipHeader, value != null ? tooltipBody : "");

		wesCountry.charts.showTooltip(text, info.event);
	}

	// Share

	this.generateShareLinks = function (url, description) {
		url = encodeURIComponent(url);
		description = encodeURIComponent(description);
		
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

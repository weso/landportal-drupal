// Constants

var ajaxURL = document.getElementById('api-url').value;
var apiURL = document.getElementById('api').value;
var languageCode = document.getElementById('selected-language').value;

var chartType = 'barchart';

var colourSerie = ['#b41739', '#4293c6', '#17c8b6', '#dba40b', '#70148e', '#70148e',
'#765E07', '#a8bb00', '#d91969', '#006a6c', '#9b967b', '#713147',
'#bbff00', '#ff0000', '#AC79C5', '#022e30', '#168cff', '#567c71',
'#4f3201', '#ff8900', '#009e00', '#414d4a', '#EDCD50', '#3a00ff'];

var title = document.getElementById('chart-title').innerHTML;
var description = document.getElementById('chart-description').innerHTML;

var label_x = 'Years';
var label_y = 'Values';

////////////////////////////////////////////////////////////////////////////////
//                              COUNTRIES SELECTORS
////////////////////////////////////////////////////////////////////////////////

function Handler() {
	var eventName = "change";
	var element = this;
	var handler;

	this.selectedIndex = 0;

	this.options = [];

	this.value = null;

	this.fire = function(obj) {
		this.options = [ { value: obj } ];
		this.value = obj;

		if (handler)
			handler.call(element, obj)
	}

	this.addEventListener = function(event, hdlr, h) {
		handler = hdlr;
	}
}

var countriesHandler = new Handler();
var coloursHandler = new Handler();

// General

var countrySelector = new (function() {
	var addButton = document.getElementById('add-country');

	this.update = function() {
		update();
	}

	function update() {
		var data = getChartData();
		var countries = data.countries;
		var colours = data.colours;

		countriesHandler.fire(countries);
		coloursHandler.fire(colours);
	}
});

////////////////////////////////////////////////////////////////////////////////
//                                PAGE STATE
////////////////////////////////////////////////////////////////////////////////

wesCountry.stateful.start({
	init: function(parameters, selectors) {
		document.getElementById('add-country').onclick = function () {
			addCountry();

			generateColourPalette();

			renderChart(chartType, label_x, label_y);

			// Invoke countrySelector
			countrySelector.update();
		};

		generateCountryRows(parameters, selectors);

		renderChart(chartType, label_x, label_y);
	},
	urlChanged: function(parameters, selectors) {

	},
	elements: [
		{
			name: "indicator",
			selector: "#indicator-select",
			onChange: function(index, value, parameters, selectors) {
				renderChart(chartType, label_x, label_y);
			}
		},
		{
			name: "countries",
			selector: countriesHandler,
			onChange: function(index, value, parameters, selectors) {

			}
		},
		{
			name: "colours",
			selector: coloursHandler,
			onChange: function(index, value, parameters, selectors) {

			}
		}
	]
});

////////////////////////////////////////////////////////////////////////////////
//                                AUXILIARY
////////////////////////////////////////////////////////////////////////////////

/* Country row generation */

function generateCountryRows(parameters, selectors) {
	var countries = parameters["countries"] != "" ? parameters["countries"].split(",") : [];
	var colours = parameters["colours"] != "" ? parameters["colours"].split(",") : [];

	var length = countries.length;

	for (var i = 0; i < length; i++) {
		var country = countries[i];
		var colour = colours[i] ? colours[i] : colourSerie[0];

		addCountry(country, colours);
	}

	if (length < 1)
		addCountry();

	generateColourPalette(colours);

	renderChart(chartType, label_x, label_y);

	// Invoke countrySelector
	countrySelector.update();
}

/* Add country */

function addCountry(country, colours) {
	var content = document.getElementById('row-prototype').innerHTML;

	var div = document.createElement('div');
	div.className = 'country-row';
	div.innerHTML = content;

	document.getElementById('countries').appendChild(div);

	if (country) {
		var countrySelect = div.querySelector('select');

		if (countrySelect)
			countrySelect.value = country;
	}
};

/* Chart type buttons */

function selectTypeButton(button) {
	// Unselect previous selected button
	var selected = document.querySelector('.widget-button-selected');
	var selectedImg = document.querySelector('.widget-button-selected img');

	selected.className = selected.className.replace(' widget-button-selected', '');
	selectedImg.src = selectedImg.src.replace('-selected.png', '.png');

	// This button
	button.className += ' widget-button-selected';

	var img = button.querySelector('img');

	if (img)
		img.src = img.src.replace('.png', '-selected.png');

	chartType = button.getAttribute('chart-type');

	renderChart(chartType, label_x, label_y);
}

var typeButtons = document.querySelectorAll('.widget-chart-button:not(.disabled)');

for (var i = 0; i < typeButtons.length; i++)
	typeButtons[i].onclick = function() {
		selectTypeButton(this);
	}

/* Chart descriptions */

document.getElementById('title').onkeyup = function() {
	title = this.value;
	document.getElementById('chart-title').innerHTML = title
	renderChart(chartType, label_x, label_y);
}

document.getElementById('description').onkeyup = function() {
	description = this.value;
	document.getElementById('chart-description').innerHTML = description;
	renderChart(chartType, label_x, label_y);
}

document.getElementById('label_x').onkeyup = function() {
	label_x = this.value;
	renderChart(chartType, label_x, label_y);
}

document.getElementById('label_y').onkeyup = function() {
	label_y = this.value;
	renderChart(chartType, label_x, label_y);
}

/* Chart preview */

function getChartData() {
	var indicatorSelect = document.getElementById('indicator-select');
	var indicator = indicatorSelect.options[indicatorSelect.selectedIndex].value;

	var countryList = '';

	var countries = document.querySelectorAll('#countries .country-select');

	for (var i = 0; i < countries.length; i++) {
		var select = countries[i];

		if (select.selectedIndex == -1)
			continue;

		var country = select.options[select.selectedIndex].value;

		if (countryList != '')
			countryList += ',';

		countryList += country;
	}

	var colourList = '';

	var colours = document.querySelectorAll('#countries .colour-selected');

	for (var i = 0; i < colours.length; i++) {
		var colour = colours[i].getAttribute('data-colour').substring(1);

		if (colourList != '')
			colourList += ',';

		colourList += colour;
	}

	return {
		indicator: indicator,
		countries: countryList,
		colours: colourList
	}
}

function callback(data) {
	var container = document.getElementById('mapDiv');
	container.innerHTML = '';

	data.container = '#mapDiv';
	data.width = container.offsetWidth;
	data.height = container.offsetHeight;
	data.events =  {
		onmouseover: util.tooltipWidgets
	}

	var chart = null;

	if (chartType == 'map')
		chart = wesCountry.maps.createMap(data);
	else
		chart = wesCountry.charts.chart(data);

	// Generate download links
	//generateDownloadLinks(chart);
}

function renderChart(type, label_x, label_y) {
	var data = getChartData();

	if (!data.countries)
		return;

	var format = '&format=jsonp';
	var parameters = 'indicator=' + data.indicator + '&countries=' + data.countries
		+ '&colours=' + data.colours + '&xTag=' + label_x + '&yTag=' + label_y;

	if (title != "")
		parameters += "&title=" + title;

	if (description != "")
		parameters += "&description=" + description;

	var url = apiURL + '/graphs/' + chartType + '?' + parameters + format;
	var script = document.createElement('script');
	script.src = url;
	document.body.appendChild(script);

	// Code to copy
	generateScript(url);

	var url = apiURL + '/graphs/' + chartType + '?' + parameters;

	showPermalink(url)

	// Share links
	url = encodeURIComponent(url);

	generateTwitterLink(url);
	generateMailLink(url);
	generateFacebookLink(url);
	generateLinkedinLink(url);
}
/*
function generateDownloadLinks(chart) {
	var canvas = document.getElementById('canvas');
	canvas.width = mapDiv.offsetWidth;
	canvas.height = mapDiv.offsetHeight;

	canvg('canvas', chart.toString())

	document.getElementById('png-link').href = 'data:image/png;' + canvas.toDataURL("image/png");
	document.getElementById('jpg-link').href = 'data:image/jpg;' + canvas.toDataURL("image/jpg");
	document.getElementById('gif-link').href = 'data:image/gif;' + canvas.toDataURL("image/gif");
	document.getElementById('svg-link').href = 'data:image/svg+xml;utf8,' + chart.toString();
}*/

// Permalink

function showPermalink(url) {
	var permalink = document.getElementById('permalink');
	permalink.href = url;
	permalink.innerHTML = url;
}

// Twitter

function generateTwitterLink(url) {
	var link = document.getElementById('twitter-link');

	if (link) {
		link.href = 'https://twitter.com/intent/tweet?original_referer=&text=' + encodeURIComponent(title) + ' ' + encodeURIComponent(description) +

		'&tw_p=tweetbutton&url=' + url + '&via=landportal';
	}
}

// Mail

function generateMailLink(url) {
	var link = document.getElementById('mail-link');

	if (link) {
		link.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(title) + ' ' + encodeURIComponent(description) + ' ' + encodeURIComponent(url);
	}
}

// Facebook

function generateFacebookLink(url) {
	var link = document.getElementById('facebook-link');

	if (link) {
		link.href = 'https://www.facebook.com/dialog/feed?app_id=145634995501895&display=popup&caption=' + encodeURIComponent(title) + ' ' + encodeURIComponent(description) +
					'&link=' + url +
					'&redirect_uri=https://developers.facebook.com/tools/explorer';
	}
}

// Linkedin

function generateLinkedinLink(url) {
	var link = document.getElementById('linkedin-link');

	if (link) {
		link.href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url +
					'&title=' + encodeURIComponent(title) + '&summary=' + encodeURIComponent(description) + '&source=landportal.info';
	}
}

// Colours

function generateOneColourPalette(container, colour) {
	var chosen = null;
	var rowChosen = null;

	for (var i = 0; i < colourSerie.length; i++) {
		var div = document.createElement('div');
		div.className = i <= 5 ? 'col-xs-2' : 'col-xs-2 plus hidden';

		container.appendChild(div);

		var innerDiv = document.createElement('div');
		innerDiv.className = 'colour';
		innerDiv.setAttribute('data-colour', colourSerie[i]);
		div.appendChild(innerDiv);

		if (i == 5) {
			innerDiv.className = 'colour-plus';
			innerDiv.innerHTML = '<i class="fa fa-plus fa-2x"></i>';

			div.opened = false;

			div.onclick = function() {
				var siblings = this.parentNode.querySelectorAll('div.plus');

				for (var j = 0; j < siblings.length; j++) {
					siblings[j].className = siblings[j].className == 'col-xs-2 plus' ? 'col-xs-2 plus hidden' : 'col-xs-2 plus';
				}

				var innerDiv = this.querySelector('div.colour-plus');
				innerDiv.innerHTML = this.opened ? '<i class="fa fa-plus fa-2x"></i>' : '<i class="fa fa-minus fa-2x"></i>'

				this.opened = !this.opened;
			}
		}
		else {
			var elementColour = colourSerie[i]
			innerDiv.style.backgroundColor = colourSerie[i];

			if ("#" + colour == elementColour)
				chosen = innerDiv;

			if (i + 1 == container.getAttribute('row')) {
				rowChosen = innerDiv;
			}

			innerDiv.onclick = function() {
				var parent = this.parentNode.parentNode;

				var colours = parent.querySelectorAll('div.colour');

				for (var i = 0; i < colours.length; i++) {
					colours[i].innerHTML = '';
					colours[i].className = 'colour';
				}

				this.className = 'colour colour-selected';

				this.innerHTML = '<i class="fa fa-check fa-2x"></i>';

				renderChart(chartType, label_x, label_y);

				countrySelector.update();
			}
		}
	}

	if (chosen) {
		chosen.className = 'colour colour-selected';
		chosen.innerHTML = '<i class="fa fa-check fa-2x"></i>';
	}
	else if (rowChosen) {
		rowChosen.className = 'colour colour-selected';
		rowChosen.innerHTML = '<i class="fa fa-check fa-2x"></i>';
	}
}

function generateColourPalette(colours) {
	var palettes = document.querySelectorAll('#countries .palette-empty');

	for (var i = 0; i < palettes.length; i++) {
		var colour = colours && colours[i] ? colours[i] : null;
		generateOneColourPalette(palettes[i], colour)
		palettes[i].className = palettes[i].className.replace('palette-empty', 'palette');
	}

	setNumberToRows();

	var deletes = document.querySelectorAll('div.delete-row');

	for (var i = 0; i < deletes.length; i++)
		deletes[i].onclick = function() {
			var div = this.parentNode;
			var parent = div.parentNode;

			parent.removeChild(div);

			setNumberToRows();
			renderChart(chartType, label_x, label_y);

			// Invoke countrySelector
			countrySelector.update();
		}

	var selectors = document.querySelectorAll('select.country-select');

	for (var i = 0; i < selectors.length; i++)
		selectors[i].onchange = function() {
			renderChart(chartType, label_x, label_y);
			countrySelector.update();
		}
}

function setNumberToRows() {
	var palettes = document.querySelectorAll('.palette');

	for (var i = 0; i < palettes.length; i++) {
			palettes[i].setAttribute('row', i + 1);
	}
}

/* Colours */

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/* Script */

function generateScript(url) {
	var code = "<script src='" + apiURL + "/static/loader.js'></script>\n<script src='" + url + "'></script>";
	document.getElementById('copy_code').innerHTML = code;
}

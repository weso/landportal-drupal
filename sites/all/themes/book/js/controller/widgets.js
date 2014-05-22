var numberOfYears = 3;
var colour1 = '#b41739';
var colour2 = '#4293c6';

var colourSerie = ['#b41739', '#4293c6', '#17c8b6', '#dba40b', '#70148e', '#70148e',
'#765E07', '#a8bb00', '#d91969', '#006a6c', '#9b967b', '#713147',
'#bbff00', '#ff0000', '#AC79C5', '#022e30', '#168cff', '#567c71',
'#4f3201', '#ff8900', '#009e00', '#414d4a', '#EDCD50', '#3a00ff'];

var title = document.getElementById('chart-title').innerHTML;
var description = document.getElementById('chart-description').innerHTML;
var api_url = document.getElementById('api').value;

/* Indicator selection */

document.getElementById('indicator-select').onchange = function() {
	renderChart(chartType);
};

/* Add country */

document.getElementById('add-country').onclick = function() {
	var content = document.getElementById('row-prototype').innerHTML;

	var div = document.createElement('div');
	div.className = 'country-row';
	div.innerHTML = content;

	document.getElementById('countries').appendChild(div);

	generateColourPalette();

	renderChart(chartType);
};

/* Chart type buttons */

var chartType = 'barchart';

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

	renderChart(chartType);
}

var typeButtons = document.querySelectorAll('.widget-chart-button:not(.disabled)');

for (var i = 0; i < typeButtons.length; i++)
	typeButtons[i].onclick = function() {
		selectTypeButton(this);
	}

/* Chart descriptions */

document.getElementById('title').onkeyup = function() {
	document.getElementById('chart-title').innerHTML = this.value;
}

document.getElementById('description').onkeyup = function() {
	document.getElementById('chart-description').innerHTML = this.value;
}

var label_x = 'Years';
var label_y = 'Values';

document.getElementById('label_x').onkeyup = function() {
	label_x = this.value;
	renderChart(chartType, label_x, label_y);
}

document.getElementById('label_y').onkeyup = function() {
	label_y = this.value;
	renderChart(chartType, label_x, label_y);
}

/* Number of years */

var numberOfYearsSelector = document.getElementById('number_years');
numberOfYearsSelector.onchange = function() {
	numberOfYears = this.options[this.selectedIndex].value;
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

	var chart = null;

	if (chartType == 'map')
		chart = wesCountry.maps.createMap(data);
	else
		chart = wesCountry.charts.chart(data);

	// Generate download links
	generateDownloadLinks(chart);
}

function renderChart(type, label_x, label_y) {
	var data = getChartData();

	var format = '&format=jsonp';
	var parameters = 'indicator=' + data.indicator + '&countries=' + data.countries + '&colours=' + data.colours;
	var url = api_url + '/graphs/' + chartType + '?' + parameters + format;
	var script = document.createElement('script');
	script.src = url;
	document.body.appendChild(script);

	// Code to copy
	generateScript(url);

	var url = api_url + '/graphs/' + chartType + '?' + parameters;

	showPermalink(url)

	// Share links
	generateTwitterLink(url);
	generateMailLink(url);
	generateFacebookLink(url);
	generateLinkedinLink(url);
/*

	var options = {
		sortSeries: true,
		margins: [10, 10, 10, 1],
		xAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px",
			title: label_x ? label_x : "Years",
			values: [],
		},
		yAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "12px",
			title: label_y ? label_y : "Values"
		},
		legend: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px"
		},
		series: [
		{
	        name: "Spain",
	        values: []
	    },
	    {
	    	name: "Italy",
	     	values: []
	    }],
	    serieColours: [colour1, colour2]
	};

	Math.seedrandom('ESP');
	for (var i = 0; i < numberOfYears; i++)
		options.series[0].values.push(random(1, 500));

	Math.seedrandom('ITA');
	for (var i = 0; i < numberOfYears; i++)
		options.series[1].values.push(random(1, 500));

	for (var i = 0; i < numberOfYears; i++)
		options.xAxis.values.push(2014 - numberOfYears + 1 + i)

	var mapDiv = document.getElementById("mapDiv");
	mapDiv.innerHTML = '';

	options.width = mapDiv.offsetWidth;

	switch(type) {
		case 'bar':
			var chart = wesCountry.charts.barChart(options);
			break;
		case 'line':
			var chart = wesCountry.charts.lineChart(options);
			break;
		case 'pie':
			var chart = wesCountry.charts.pieChart(options);
			break;
		case 'area':
			var chart = wesCountry.charts.areaChart(options);
			break;
		case 'polar':
			var chart = wesCountry.charts.polarChart(options);
			break;
		case 'scatter':
			var chart = wesCountry.charts.scatterPlot(options);
			break;
	}

	mapDiv.appendChild(chart.render());
*/
}

function generateDownloadLinks(chart) {
	var canvas = document.getElementById('canvas');
	canvas.width = mapDiv.offsetWidth;
	canvas.height = mapDiv.offsetHeight;

	canvg('canvas', chart.toString())

	document.getElementById('png-link').href = 'data:image/png;' + canvas.toDataURL("image/png");
	document.getElementById('jpg-link').href = 'data:image/jpg;' + canvas.toDataURL("image/jpg");
	document.getElementById('gif-link').href = 'data:image/gif;' + canvas.toDataURL("image/gif");
	document.getElementById('svg-link').href = 'data:image/svg+xml;utf8,' + chart.toString();
}

function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}

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
		link.href = 'https://twitter.com/intent/tweet?original_referer=&text=' + title + ' ' + description +

		'&tw_p=tweetbutton&url=' + url + '&via=landportal';
	}
}

// Mail

function generateMailLink(url) {
	var link = document.getElementById('mail-link');

	if (link) {
		link.href = 'mailto:?subject=' + title + '&body=' + title + ' ' + description + ' ' + url;
	}
}

// Facebook

function generateFacebookLink(url) {
	var link = document.getElementById('facebook-link');

	if (link) {
		link.href = 'https://www.facebook.com/dialog/feed?app_id=145634995501895&display=popup&caption=' + title + ' ' + description +
					'&link=' + url +
					'&redirect_uri=https://developers.facebook.com/tools/explorer';
	}
}

// Linkedin

function generateLinkedinLink(url) {
	var link = document.getElementById('linkedin-link');

	if (link) {
		link.href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url +
					'&title=' + title + '&summary=' + description + '&source=landportal.info';
	}
}

// Colours

function generateOneColourPalette(container) {
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
			innerDiv.style.backgroundColor = colourSerie[i];

			if (i + 1 == container.getAttribute('row')) {
				innerDiv.innerHTML = '<i class="fa fa-check fa-2x"></i>';
				innerDiv.className = 'colour colour-selected';
			}

			innerDiv.onclick = function() {
				var parent = this.parentNode.parentNode;

				var colours = parent.querySelectorAll('div.colour');

				for (var i = 0; i < colours.length; i++) {
					colours[i].innerHTML = '';
					colours[i].className = 'colour';
				}

				this.className = 'colour colour-selected';

				var row = parent.getAttribute('row');

				switch(row) {
					case "1":
						colour1 = window.getComputedStyle(this, null).getPropertyValue("background-color");
						break;
					case "2":
						colour2 = window.getComputedStyle(this, null).getPropertyValue("background-color");
						break;
				}

				this.innerHTML = '<i class="fa fa-check fa-2x"></i>';

				renderChart(chartType, label_x, label_y);
			}
		}
	}
}

function generateColourPalette() {
	var palettes = document.querySelectorAll('#countries .palette-empty');

	for (var i = 0; i < palettes.length; i++) {
		generateOneColourPalette(palettes[i])
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
			renderChart(chartType);
		}

	var selectors = document.querySelectorAll('select.country-select');

	for (var i = 0; i < selectors.length; i++)
		selectors[i].onchange = function() {
			renderChart(chartType);
		}
}

generateColourPalette();

renderChart(chartType);

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
	var code = "<script src='" + api_url + "/static/loader.js'></script>\n<script src='" + url + "'></script>";
	document.getElementById('copy_code').innerHTML = code;
}

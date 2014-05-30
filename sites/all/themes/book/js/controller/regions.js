showTimelineLoading();

var timeline = new util.timelineChart({
	chartOptions: chartOptions['chart-timeline-comparison'],
	firstElement: null,
	secondElement: null,
	getfirstElementData: null,
	getSecondElementData: null
});

// API connection

function getAPIInfo(region, indicator) {
	ajax.loadObservations(region, indicator, function(observations) { console.log(observations)
		setTimeSelector(observations.times);
		loadHeatMap(selectedYear);
		updateCompareChart(selectedIndicator, selectedYear);

		ajax.loadObservationsAverage(selectedRegion, selectedIndicator, function(data) {
			timeline.updateFirstElement(selectedRegion, JSON.parse(data));

			// First time
			if (!timeline.secondElementData())
				getCompareRegionObservations();
		});
	});
}

// Indicator select

var selectedIndicator = '';
var selectedYear = null;
var selectedRegion = document.getElementById('entity-id') ? document.getElementById('entity-id').value : 1;

if (selectedRegion == '')
	selectedRegion = 1;

var indicatorSelect = document.getElementById('indicator-select');

indicatorSelect.onchange = function() {
	selectedIndicator = this.options[this.selectedIndex].value;

	var texts = document.querySelectorAll('span.indicator-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;

	var source = this.options[this.selectedIndex].parentNode.label;

	var sourceSelect = document.getElementById('source-select');

	for (var i = 0; i < sourceSelect.options.length; i++)
		if (sourceSelect.options[i].innerHTML == source) {
			sourceSelect.selectedIndex = sourceSelect.options[i].index;

			break;
		}

	getAPIInfo(selectedRegion, selectedIndicator);
}

indicatorSelect.selectedIndex = 0;
indicatorSelect.onchange();

// Charts

function updateCompareChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-region-bar-comparison'];

	var container = document.querySelector(options.container);

	if (!container)
		return;

	options.series = [];
	options.serieColours = [];

	var colour1 = {
		r: 17,
		g: 132,
		b: 167
	};

	var colour2 = {
		r: 169,
		g: 245,
		b: 188
	};

	var countries = ajax.getObservations().observations[selectedYear] ? ajax.getObservations().observations[selectedYear] : [];

	for (var i = 0; i < countries.length; i++) {
		var serie = {
			'name': countries[i].name,
			'values': [
				countries[i].value
			]
		};

		options.series.push(serie);
	}

	for (var i = 0; i < countries.length; i++) {
		options.serieColours.push(makeGradientColour(colour1, colour2, (i / countries.length) * 100).cssColour);
	}

	options.series.sort(function(a, b) {
		return b.values[0] - a.values[0];
	});

	options.width = container.offsetWidth;
	options.height = container.offsetHeight;

	var chart = wesCountry.charts.barChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

// Map

function loadHeatMap(year) {console.log(ajax.getObservations())
	var countryData = ajax.getObservations().observations[year] ? ajax.getObservations().observations[year] : [];

	function loadMap() {
		var map = document.querySelector('#mapDiv .map-container');

		if (map)
			map.innerHTML = '';

		wesCountry.maps.createMap({
			container: '#mapDiv .map-container',
			"borderWidth": 1,
			"borderColour": '#aaa',
			countries: countryData,
			onCountryClick: function(info) {
				window.location.href = '/book/countries/' + info.iso3;
			}
		});
	}

	window.onresize = loadMap;

	loadMap();
}

// Region select

var regionSelect = document.getElementById('region-select');

regionSelect.onchange = function() {
	var region = this.options[this.selectedIndex].value;

	selectedRegion = region;

	var texts = document.querySelectorAll('span.region-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;

	history.pushState({}, document.title, "/book/regions/" + region);

	var option = document.querySelector('#region-comparer option[disabled]');
	option.disabled = false;

	var option = document.querySelector('#region-comparer option[value="' + selectedRegion + '"]');
	option.disabled = true;

	regionComparerSelected(option.index);

	getAPIInfo(selectedRegion, selectedIndicator);
};

(function() {
	var index = document.querySelector('#region-select option[value="' + selectedRegion + '"]');
	document.getElementById('region-select').selectedIndex = index ? index.index : 0;

	var option = document.querySelector('#region-comparer option[value="' + selectedRegion + '"]');
	option.disabled = true;

	regionComparerSelected(index.index);
})();

// Map timeline

function setTimeSelector(times) {
	document.getElementById('timeline').innerHTML = '';

	selectedYear = times.length > 0 ? times[times.length - 1] : null;

	wesCountry.selector.timeline({
		container: '#timeline',
		elements: times,
		selected: selectedYear,
		onChange: function(element) {
			selectedYear = element;

			loadHeatMap(selectedYear);
			showChartsByRegion(selectedRegion);
		}
	});
}

// Source select

var sourceSelect = document.getElementById('source-select');
sourceSelect.selectedIndex = 0;

sourceSelect.onchange = function() {
	var source = this.options[this.selectedIndex].value;

	var indicatorSelect = document.getElementById('indicator-select');

	var indicatorOption = document.querySelector('#indicator-select optgroup[label="' + source + '"] option:first-child');

	if (indicatorOption) {
		indicatorSelect.selectedIndex = indicatorOption.index;
		indicatorSelect.onchange();
	}
}

// Colours

function makeGradientColour(colour1, colour2, percent) {
    var newColour = {};

    function makeChannel(a, b) {
        return(a + Math.round((b - a) * (percent / 100)));
    }

    function makeColourPiece(num) {
        num = Math.min(num, 255);   // not more than 255
        num = Math.max(num, 0);     // not less than 0

        var str = num.toString(16);

        if (str.length < 2) {
            str = "0" + str;
        }

        return(str);
    }

    newColour.r = makeChannel(colour1.r, colour2.r);
    newColour.g = makeChannel(colour1.g, colour2.g);
    newColour.b = makeChannel(colour1.b, colour2.b);
    newColour.cssColour = "#" +
                        makeColourPiece(newColour.r) +
                        makeColourPiece(newColour.g) +
                        makeColourPiece(newColour.b);

    return(newColour);
}

/* Country select */

document.getElementById('country-select').onchange = function() {

	window.location.href = '/book/countries/' + this.options[this.selectedIndex].value;
}

/* Region comparition */

document.getElementById('region-comparer').onchange = function() {
	showTimelineLoading();

	getCompareRegionObservations();
};

function getCompareRegionObservations() {
	var compareRegion = document.getElementById('region-comparer');
	compareRegion = compareRegion.options[compareRegion.selectedIndex].value;

	showTimelineLoading();

	ajax.loadObservationsAverage(compareRegion, selectedIndicator, function(data) {
		timeline.updateSecondElement(compareRegion, JSON.parse(data));
	});
}

function regionComparerSelected(index) {
	var comparer = document.getElementById('region-comparer');

	if (comparer.selectedIndex == index) {
		if (index + 1 < comparer.options.length)
			comparer.selectedIndex = index + 1;
		else if (index - 1 >= 0)
			comparer.selectedIndex = index - 1;
	}
}

function showTimelineLoading() {
	var options = chartOptions['chart-timeline-comparison'];
	var container = document.querySelector(options.container);

	var path = document.getElementById('path').value;
	container.innerHTML = '<img src="' + path + '/static/images/loading.gif" class="loading" style="display:inline" alt="" />';
}

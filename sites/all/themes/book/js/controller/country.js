function getRegionStringCode(code) {
	switch(code) {
		case "19":
			return 'americas';
		case "2":
			return 'africa';
		case "150":
			return 'europe';
		case "142":
			return 'asia';
		case "9":
			return 'oceania';
	}

	return '';
}

var indicatorSelect = document.getElementById('indicator-select');
var selectedIndicator = indicatorSelect.options[0].value;

function getCountryRegion() {
	var id = document.getElementById('continent-id').value;
	var name = document.getElementById('continent-name').value;

	return {
		code: id,
		name: name
	};
}

function getCountry() {
	var code = document.getElementById('entity-id').value;
	var name = document.getElementById('country-name').value;

	return {
		"code": code,
		"name": name,
		"region": getCountryRegion()
	}
}

var timelineObjects = {
	main: null,
	starred: {}
};

(function() {
	var country = getCountry();

	var worldMap = document.querySelector('#world-map');

	wesCountry.maps.createMap({
		container: '#world-map',
		"borderWidth": '0em',
		"borderColour": "#e8e8e8",
		"colourRange": ["#64B966"],
		"backgroundColour": "#fff",
		"landColour": "#e8e8e8",
		"zoom": false,
		countries: [
			{
				"code": country.code,
				"value": 100,
			}
		],
		selectedRegionColour: "#B9DD76",
		selectedRegionBorderColour: "#B9DD76",
		selectedRegions: [
			country.region
		],
		onCountryClick: function(info) {
			window.location.href = '/countries/' + info.iso3;
		}
	});

	var map = wesCountry.maps.createMap({
		container: '#country-map',
		"borderWidth": '0.1em',
		"borderColour": "#d8d8d8",
		"colourRange": ["#64B966"],
		"backgroundColour": "#fff",
		"landColour": "#e8e8e8",
		"zoom": false,
		countries: [
			{
				"code": country.code,
				"value": 100,
			}
		],
		selectedRegionColour: "#B9DD76",
		selectedRegions: [
			country.region
		],
		onCountryClick: function(info) {
			window.location.href = '/countries/' + info.iso3;
		}
	});

	map.zoomToCountry(country.code);

	// Starred indicators

	var comparingCountry = document.getElementById('country-comparison');
	var comparingCountryName = comparingCountry.options[comparingCountry.selectedIndex].innerHTML;

	timelineObjects.main = new util.timelineChart({
		chartOptions: chartOptions['chart-timeline-comparison'],
		firstElement: country.name,
		secondElement: comparingCountryName,
		getfirstElementData: null,
		getSecondElementData: null
	});

	var starredIndicatorList = document.getElementById('starred-indicators').value.split(',');

	for (var i = 0; i < starredIndicatorList.length; i++) {
		var indicator = starredIndicatorList[i];

		if (!indicator)
			 continue;

		var options = clone(chartOptions['starred-indicator']);
		options.container = '#starred_' + indicator;

		timelineObjects.starred[indicator] = new util.timelineChart({
			chartOptions: options,
			firstElement: country.name,
			secondElement: comparingCountryName,
			getfirstElementData: null,
			getSecondElementData: null
		});
	}

	ajax.loadObservationsByCountry(country.code, function(starredData) {
		var processedIndicators = [];

		for (var i = 0; i < starredData.length; i++) {
			var indicator = starredData[i].indicator;
			var values = starredData[i].values;

			processedIndicators.push(indicator);

			if (timelineObjects.starred[indicator])
				timelineObjects.starred[indicator].updateFirstElement(country.name, values);
		}

		// Indicators with no data for main country
		for (var i = 0; i < starredIndicatorList.length; i++) {
			var indicator = starredIndicatorList[i];

			if (!indicator)
				continue;

			if (processedIndicators.indexOf(indicator) == -1) {
				if (timelineObjects.starred[indicator])
					timelineObjects.starred[indicator].updateFirstElement(country.name, []);
			}
		}

		updateTimelineCountry(showByIndicator);
	});
})();

function cloneObject(obj) {
	var o = {};

	for (var property in obj)
		o[property] = obj[property];

	return o;
}

function showFixedCharts() {
	for (var element in chartOptions) {
	    var options = cloneObject(chartOptions[element]);

			var container = options.container;

			if (!container)
				continue;

			container = document.querySelector(container);

			if (!container)
				continue;

	    options.container += ' div.chart-content';
	    var container = options.container;

	    if (!container)
	        continue;

	    container = document.querySelector(container);

	    if (!container)
	        continue;

	    container.style.display = 'block';

	    var innerDiv = container.querySelector(options.container + ' div.table-responsive div');

	    if (innerDiv)
	    	innerDiv.parentNode.removeChild(innerDiv);

	    options.width = container.parentNode.offsetWidth;
	    options.height = container.parentNode.offsetHeight;

	    var selectBy = options.selectBy ? options.selectBy : "byTime";

	    wesCountry.data.parseTable(options, selectBy);
	}
}

showFixedCharts();

function showByIndicator() {
	var indicatorSelect = document.getElementById('indicator-select');
	selectedIndicator = indicatorSelect.options[indicatorSelect.selectedIndex].value;

	ajax.loadObservations(getCountryRegion().code, selectedIndicator, function(data) {
		var filteredData = lastObservationForEachCountry(data);
		updateCompareChart(filteredData);
		loadIndicatorMap(filteredData);
	});

	ajax.loadObservationsByCountryAndIndicator(getCountry().code, selectedIndicator, function(data) {
		data = data.length > 0 ? data[0].values : [];
		timelineObjects.main.updateFirstElement(getCountry().name, data);
	});

	var comparingCountry = document.getElementById('country-comparison');
	var countryCode = comparingCountry.options[comparingCountry.selectedIndex].value;
	var countryName = comparingCountry.options[comparingCountry.selectedIndex].innerHTML;

	ajax.loadObservationsByCountryAndIndicator(countryCode, selectedIndicator, function(data) {
		data = data.length > 0 ? data[0].values : [];
		timelineObjects.main.updateSecondElement(countryName, data);
	});

	var texts = document.querySelectorAll('span.indicator-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = indicatorSelect.options[indicatorSelect.selectedIndex].innerHTML;
}

function lastObservationForEachCountry(countryData) {
	// We get the last observation of each country

	var lastTime = countryData.times[countryData.times.length - 1];
	var countryList = [];
	var countryCodeList = [];

	for (var i = countryData.times.length - 1; i >= 0; i--) {
		var year = countryData.times[i];
		var observations = countryData.observations[year];

		for (var j = 0; j < observations.length; j++) {
			var code = observations[j].code;

			if (countryCodeList.indexOf(code) == -1) {
				countryCodeList.push(code);
				countryList.push(observations[j]);
			}
		}
	}

	return countryList;
}

//showByIndicator();

var regionMap = null;

function loadIndicatorMap(countryData) {
	var map = document.querySelector('#mapDiv .map-container');

	if (map)
		map.innerHTML = '';

	var map = document.querySelector('#mapDiv .map-container');

	if (map)
		map.innerHTML = '';

	var countryList = countryData;

	regionMap = wesCountry.maps.createMap({
		container: '#mapDiv .map-container',
		borderWidth: '0.28em',
		borderColour: '#dfdfdf',
		landColour: '#e8e8e8',
		colourRange: ['#A9F5BC', '#1184a7'],
		countries: countryList,
		zoom: false,
		zoomToCountryFactor: 1,
		onCountryClick: function(info) {
			window.location.href = '/countries/' + info.iso3;
		},
		onCountryOver: function(info) {
			selectCountry(this, info);
		},
		onCountryOut: function(info) {

		}
	});

	var regionCode = getRegionStringCode(getCountry().region.code);

	regionMap.zoomToCountry('region-' + regionCode);

	selectCountry(null, regionMap.getCountryInfo(getCountry().code));
}

function selectCountry(e, info) {
	if (!info.value)
		return;

	var selected = document.querySelectorAll('.selected-country');

	for (var i = 0; i < selected.length; i++) {
		var element = selected[i];

		var className = element.getAttribute('class');
		className = className.replace(' selected-country', '');
		element.setAttributeNS(null, 'class', className);
	}

	if (!e)
		e = document.querySelector('.indicator-map #' + info.iso3);

	var className = e.getAttribute('class');
	className += ' selected-country';
	e.setAttributeNS(null, 'class', className);

	showCountryInfo({
		id: info.iso3,
		name: info.nombre,
		value: info.value
	});

	// Highlight bar

	var bar = document.querySelector('#chart-region-bar-comparison #' + info.iso3);

	if (bar)
		bar.selectBar();
}

function showCountryInfo(info) {
	var visor = regionMap.visor();

	if (!visor)
		return;

	visor.innerHTML = '';

	var left = document.createElement('div');
	left.className = 'left';
	visor.appendChild(left);

	var flag = document.createElement('img');
	left.appendChild(flag);

	flag.className = 'country-flag flag-' + info.id;
	flag.alt = '';
	flag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeAQMAAAAB/jzhAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBiMAAAAlgABjcjBIQAAAABJRU5ErkJggg==";

	var name = document.createElement('span');
	name.innerHTML = info.name;
	name.className = 'name';
	left.appendChild(name);

	var value = document.createElement('span');
	value.innerHTML = info.value;
	value.className = 'value';
	visor.appendChild(value);
}

function updateCompareChart(countryData) {
	var options = chartOptions['chart-region-bar-comparison'];

	var container = document.querySelector(options.container);

	if (!container)
		return;

	//var lastTime = countryData.times[countryData.times.length - 1];
	//var countries = countryData.observations[lastTime];
	var countries = countryData;

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

	for (var i = 0; i < countries.length; i++) {
		var serie = {
			'id': countries[i].code,
			'name': countries[i].name,
			'values': [
				parseFloat(countries[i].value)
			]
		};

		options.series.push(serie);
	}

	options.series.sort(function(a, b) {
		return b.values[0] - a.values[0];
	});

	var country = getCountry().name;

	options.overColour = "#FFBF00";

	for (var i = 0; i < countries.length; i++) {
		options.serieColours.push(makeGradientColour(colour1, colour2, (i / countries.length) * 100).cssColour);
	}

	options.width = container.offsetWidth;
	options.height = container.offsetHeight;

	// Tooltip

	options.events = {
		onmouseover: function(info) {
			selectCountry(null, regionMap.getCountryInfo(info.id));
		}
	}

	var chart = wesCountry.charts.barChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

/* Source select */

var sourceSelect = document.getElementById('source-select');
//sourceSelect.selectedIndex = 0;
for (var i = 0; i < sourceSelect.options.length; i++)
	if (!sourceSelect.options[i].disabled) {
		sourceSelect.selectedIndex = i;
		break;
	}

var selectedIndicator = '';

sourceSelect.onchange = function() {
	var source = this.options[this.selectedIndex].value;

	var indicatorSelect = document.getElementById('indicator-select');

	var indicatorOption = document.querySelector('#indicator-select optgroup[label="' + source + '"] option:first-child');

	if (indicatorOption) {
		indicatorSelect.selectedIndex = indicatorOption.index;
		indicatorSelect.onchange();
	}
}

// Indicator select

var indicatorSelect = document.getElementById('indicator-select');

indicatorSelect.onchange = function() {
	//selectedIndicator = this.options[this.selectedIndex].value;
	showByIndicator();

	//var texts = document.querySelectorAll('span.indicator-name');

	//for (var i = 0; i < texts.length; i++)
	//	texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;
};

//indicatorSelect.selectedIndex = 0;

for (var i = 0; i < indicatorSelect.options.length; i++)
	if (!indicatorSelect.options[i].disabled) {
		indicatorSelect.selectedIndex = i;
		break;
	}

//indicatorSelect.onchange();

/* Country select */

document.getElementById('country-select').onchange = function() {
	window.location.href = '/countries/' + this.options[this.selectedIndex].value;
}

/* Timeline */

document.getElementById('country-comparison').onchange = function () {
	var comparingCountry = this;
	var countryCode = comparingCountry.options[comparingCountry.selectedIndex].value;
	var countryName = comparingCountry.options[comparingCountry.selectedIndex].innerHTML;

	ajax.loadObservationsByCountryAndIndicator(countryCode, selectedIndicator, function(data) {
		data = data.length > 0 ? data[0].values : [];
		timelineObjects.main.updateSecondElement(countryName, data);

		updateTimelineCountry();
	});
}

function updateTimelineCountry(callback) {
	var comparingCountry = document.getElementById('country-comparison');
	var comparingCountryName = comparingCountry.options[comparingCountry.selectedIndex].innerHTML;

	var starredIndicatorList = document.getElementById('starred-indicators').value.split(',');

	ajax.loadObservationsByCountry(comparingCountry.options[comparingCountry.selectedIndex].value, function(starredData) {
		var processedIndicators = [];

		for (var i = 0; i < starredData.length; i++) {
			var indicator = starredData[i].indicator;
			var values = starredData[i].values;

			processedIndicators.push(indicator);

			if (timelineObjects.starred[indicator])
				timelineObjects.starred[indicator].updateSecondElement(comparingCountryName, values);
		}

		// Indicators with no data for comparing country
		for (var i = 0; i < starredIndicatorList.length; i++) {
			var indicator = starredIndicatorList[i];

			if (!indicator)
				continue;

			if (processedIndicators.indexOf(indicator) == -1) { console.log(indicator)
				if (timelineObjects.starred[indicator])
					timelineObjects.starred[indicator].updateSecondElement(comparingCountryName, []);
			}
		}

		if (callback)
			callback();
	});
}

// Full data button

document.getElementById('full-data-button').onclick = function() {
	window.location.href = '/countries/' + getCountry().code + '/details';
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

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor();

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

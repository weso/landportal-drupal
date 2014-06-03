// Constants

var ajaxURL = document.getElementById('api-url').value;
var languageCode = document.getElementById('selected-language').value;

////////////////////////////////////////////////////////////////////////////////
//                                 LOADERS
////////////////////////////////////////////////////////////////////////////////

// Map loader

var mapLoader = wesCountry.loader.renderChart({
	container: "#map",
	chartType: "map",
	download: true,
	cache: true,
	onChange: function(element, index) {
	},
	getChartData: function(options, data) {
		data = JSON.parse(data);
		options["countries"] = data.all;
		options.foot = getDatasourceLink(data.organization_id, data.organization_name);

		// Update country table
		countryLoader.hide();
		updateCountryTable(data.by_country);

		return options;
	},
	onCountryClick: function(info) {
		var indicator = pageStatus.getParameters()['indicator'];
		window.location.href = String.format('/book/countries/{0}?indicator={1}', info.iso3, indicator);
	}
});

// Timeline loader

var timelineOptions = chartOptions['chart-timeline-comparison'];
timelineOptions.cache = true;
timelineOptions.getChartData = function(options, data) {
		data = JSON.parse(data);

		var series = [];

		var indicatorSelect = document.getElementById('indicator-select');
		var indicatorComparingSelect = document.getElementById('indicator-comparing-select');

		var serie1 = indicatorSelect.value;
		var serie2 = indicatorComparingSelect.value;

		var indicator1Name = indicatorSelect.options[indicatorSelect.selectedIndex] ?
			indicatorSelect.options[indicatorSelect.selectedIndex].innerHTML : "";
		var indicator2Name = indicatorComparingSelect.options[indicatorComparingSelect.selectedIndex] ?
			indicatorComparingSelect.options[indicatorComparingSelect.selectedIndex].innerHTML : "";

		if (data.series[serie1]) {
			series.push(data.series[serie1]);
			series[0].name = indicator1Name;
		}

		if (data.series[serie2]) {
			series.push(data.series[serie2]);
			if (series[1])
				series[1].name = indicator2Name;
		}

		options.series = series
		options.xAxis.values = data.times;

		// Update legend

		document.getElementById('compare-legend-circle-1').style.backgroundColor = options.serieColours[0];
		document.getElementById('compare-legend-circle-2').style.backgroundColor = options.serieColours[1];

		document.getElementById('compare-legend-text-1').innerHTML = indicator1Name;
		document.getElementById('compare-legend-text-2').innerHTML = indicator2Name;

		// Sources link

		var sources = data.sources;
		var length = sources.length;

		var sourceLink = "";

		for (var i = 0; i < length; i++) {
			var id = sources[i].id;
			var name = sources[i].name;

			sourceLink += String.format("source{0}: <a href='/book/sources/{1}'>{2}</a>{3}",
					(length > 1 ? " " + (i + 1) : ""),
					id, name,
					(length > 1 ? "<br />" : "")
				);
		}

		options.foot = sourceLink;

		return options;
};

var timelineLoader = wesCountry.loader.renderChart(timelineOptions);

// Correlate loader

var correlateOptions = chartOptions['chart-correlation-comparison'];
correlateOptions.cache = true;
correlateOptions.getChartData = function(options, data) {
		data = JSON.parse(data);

		var series = [];

		var indicatorSelect = document.getElementById('indicator-select');
		var indicatorComparingSelect = document.getElementById('indicator-relating-select');

		var serie1 = indicatorSelect.value;
		var serie2 = indicatorComparingSelect.value;

		var indicator1Name = indicatorSelect.options[indicatorSelect.selectedIndex] ?
			indicatorSelect.options[indicatorSelect.selectedIndex].innerHTML : "";
		var indicator2Name = indicatorComparingSelect.options[indicatorComparingSelect.selectedIndex] ?
			indicatorComparingSelect.options[indicatorComparingSelect.selectedIndex].innerHTML : "";

		// Titles

		options.yAxis.title = indicator1Name;
		options.xAxis.title = indicator2Name;

		// Series

		var serie = {
			name: String.format("{0} - {1}", indicator1Name, indicator2Name),
			values: []
		}

		var serie1 = data.series[serie1] ? data.series[serie1] : { values: [] };
		var serie2 = data.series[serie2] ? data.series[serie2] : { values: [] };

		var times = data.times;
		var length = times.length;

		for (var i = 0; i < length; i++) {
			var value1 = serie1.values[i] ? serie1.values[i] : null;
			var value2 = serie2.values[i] ? serie2.values[i] : null;

			if (value1 && value2)
				serie.values.push([value1, value2]);
		}

		options.series = [serie];

		// Sources link

		var sources = data.sources;
		var length = sources.length;

		var sourceLink = "";

		for (var i = 0; i < length; i++) {
			var id = sources[i].id;
			var name = sources[i].name;

			sourceLink += String.format("source{0}: <a href='/book/sources/{1}'>{2}</a>{3}",
					(length > 1 ? " " + (i + 1) : ""),
					id, name,
					(length > 1 ? "<br />" : "")
				);
		}

		options.foot = sourceLink;

		return options;
};

var correlatingLoader = wesCountry.loader.renderChart(correlateOptions);

// Country table loader
var countryLoader = wesCountry.loader.render({
	container: "#loading"
})

////////////////////////////////////////////////////////////////////////////////
//                                PAGE STATE
////////////////////////////////////////////////////////////////////////////////

var pageStatus = wesCountry.stateful.start({
	init: function(parameters, selectors) {

	},
	urlChanged: function(parameters, selectors) {
		var indicatorSelector = selectors['#all-indicator-select'];

		indicator = indicatorSelector.options[indicatorSelector.selectedIndex].innerHTML;

		var description = String.format("{0} @landportal", indicator);
		var url = document.URL;

		util.generateShareLinks(url, description);
	},
	elements: [
		{
			name: "topic",
			ignore: true,
			selectedIndex: function(parameters, selectors) {
				// If no indicator in query then first element is selected
				// Else the topic for that indicator is selected
				return getTopicFromSelectedIndicator(parameters, selectors);
			},
			selector: "#topic-select",
			onChange: function(index, value, parameters, selectors) {
				// Get topic indicators
				var ret =  getIndicatorsForTopic(index, value, parameters, selectors);

				if (ret.length > 0) {
					var indicatorSelect = selectors["#indicator-select"];
					indicatorSelect.selectedIndex = ret.selectedIndex;
					indicatorSelect.refresh();
				}
			}
		},
		{
			name: "indicator",
			selector: "#indicator-select",
			onChange: function(index, value, parameters, selectors) {
				selectors['#all-indicator-select'].value = value;

				// Se indicator name
				setIndicatorName(selectors["#indicator-select"]);

				// Load map
				loadMap(parameters);

				// Update comparing selectors
				updateComparingIndicatorSelectors(parameters, selectors);
			}
		},
		{
			name: "indicator",
			selector: "#all-indicator-select",
			onChange: function(index, value, parameters, selectors) {
				// Get topic from selected indicator
				var topic = getTopicFromSelectedIndicator(parameters, selectors);
				selectors["#topic-select"].selectedIndex = topic;

				// Get indicators for that topic
				getIndicatorsForTopic(topic, value, parameters, selectors);

				// Set the indicator as selected
				selectors["#indicator-select"].value = value;

				// Se indicator name
				setIndicatorName(selectors["#all-indicator-select"]);

				// Load map
				loadMap(parameters);

				// Update comparing selectors
				updateComparingIndicatorSelectors(parameters, selectors);
			}
		},
		{
			name: "comparing-indicator",
			selector: "#indicator-comparing-select",
			onChange: function(index, value, parameters, selectors) {
				loadComparingTimeline(parameters);
			}
		},
		{
			name: "relating-indicator",
			selector: "#indicator-relating-select",
			onChange: function(index, value, parameters, selectors) {
				loadRelatingTimeline(parameters);
			}
		}
	]
});

////////////////////////////////////////////////////////////////////////////////
//                                CHARTS
////////////////////////////////////////////////////////////////////////////////

// Refresh map

function loadMap(parameters) {
	var region = 1; // Global
	var datasource = parameters["datasource"];
	var indicator = parameters["indicator"];

	// Show loading for country table
	document.querySelector('#country-values tbody').innerHTML = '';
	countryLoader.show();

	mapLoader.load({
		url: ajaxURL + '/observations_by_region.php',
		parameters: String.format("region={0}&indicator={1}&language={2}",
															region, indicator, languageCode)
	});
}

// Refresh comparing timeline

function loadComparingTimeline(parameters) {
	var indicator1 = parameters["indicator"];
	var indicator2 = parameters["comparing-indicator"];

	timelineLoader.load({
		url: ajaxURL + '/observations_by_indicator_average.php',
		parameters: String.format("indicator1={0}&indicator2={1}&language={2}",
															indicator1, indicator2, languageCode)
	});
}

// Refresh relating chart

function loadRelatingTimeline(parameters) {
	var indicator1 = parameters["indicator"];
	var indicator2 = parameters["relating-indicator"];

	correlatingLoader.load({
		url: ajaxURL + '/observations_by_indicator_average.php',
		parameters: String.format("indicator1={0}&indicator2={1}&language={2}",
															indicator1, indicator2, languageCode)
	});
}

////////////////////////////////////////////////////////////////////////////////
//                                AUXILIARY
////////////////////////////////////////////////////////////////////////////////

function selectTopic(topicIndex) {
	return document.querySelector('select.topic-indicator-select:nth-of-type(' + topicIndex + ')');
}

function getTopicFromSelectedIndicator(parameters, selectors) {
	var indicator = parameters["indicator"];
	var selector = selectors['#all-indicator-select'];

	var topic = 0;

	if (selector.value == indicator) {
		var topicOpt = selector.options[selector.selectedIndex].parentNode;

		if (topicOpt) {
			var topics = selector.querySelectorAll('optgroup');

			if (topics && topics.indexOf)
				topic = topics.indexOf(topicOpt);
		}
	}

	return topic == -1 ? 0 : topic;
}

function getIndicatorsForTopic(index, value, parameters, selectors) {
	var indicator = parameters["indicator"];

	var selector = selectTopic(index + 1);
	var indicatorSelect = selectors["#indicator-select"];

	var length = selector.options.length;

	indicatorSelect.innerHTML = '';

	var selectedIndex = 0;

	for (var i = 0; i < length; i++) {
		var option = selector.options[i];
		var value = option.value;
		var html = option.innerHTML;

		// If indicator in query then set as selected
		if (value == indicator)
			selectedIndex = i;

		option = document.createElement('option');
		option.value = value;
		option.innerHTML = html;
		indicatorSelect.appendChild(option);
	}

	return {
		selectedIndex: selectedIndex,
		length: length
	};
}

function setIndicatorName(selector) {
	var indicatorName = selector.options[selector.selectedIndex] ?
		selector.options[selector.selectedIndex].innerHTML : "";

	var texts = document.querySelectorAll('span.indicator-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = indicatorName;
}

function getDatasourceLink(datasource, datasourceName) {
	return String.format("source: <a href='/book/sources/{0}'>{1}</a>", datasource, datasourceName)
}

function updateComparingIndicatorSelectors(parameters, selectors) {
	var indicator = parameters["indicator"];

	updateComparingIndicatorSelector(indicator, selectors["#indicator-comparing-select"]);
	updateComparingIndicatorSelector(indicator, selectors["#indicator-relating-select"]);
}

function updateComparingIndicatorSelector(indicator, selector) {
	var option = selector.querySelector('option[disabled]');

	if (option)
		option.disabled = false;

	var option = selector.querySelector('option[value="' + indicator + '"]');

	if (option)
		option.disabled = true;

	var index = option.index;

	if (selector.selectedIndex == index) {
		if (index + 1 < selector.options.length)
			selector.selectedIndex = index + 1;
		else if (index - 1 >= 0)
			selector.selectedIndex = index - 1;
	}

	selector.refresh();
}

// Country table

function updateCountryTable(countryList) {
	var tbody = document.querySelector('#country-values tbody');

	if (!tbody)
		return;

	tbody.innerHTML = '';

	var path = document.getElementById('path').value;

	for (var i = 0; i < countryList.length; i++) {
		var country = countryList[i];
		var code = country.code;
		var value = Number(country.value);
		var previous_value = Number(country.previous_value);
		var name = country.countryName;
		var time = country.time;
		var lastUpdate = country.indicator.last_update.split(' ');
		lastUpdate = lastUpdate.length > 0 ? lastUpdate[0] : '';
		lastUpdate = lastUpdate != '' ? new Date(lastUpdate) : '-';

		var preferable_tendency = country.preferable_tendency;

		var tr = document.createElement('tr');
		tbody.appendChild(tr);

		var td = document.createElement('td');
		tr.appendChild(td);

		var sorter = document.createElement('span');
		sorter.appendChild(document.createTextNode(name));
		sorter.className = 'hidden';
		td.appendChild(sorter);

		var flag = document.createElement('img');
		flag.src = path + '/static/images/flags/' + code.toUpperCase() + ".png";
		flag.className = "flag";
		flag.onerror = function() {
			this.src = path + '/static/images/flags/no-flag.png'
		}

		td.appendChild(flag);
		td.appendChild(document.createTextNode(name));

		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = time;
		td.className = "text-center";

		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = value.toFixed(2);
		td.className = "text-right";

		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = lastUpdate.toLocaleDateString();
		td.className = "text-center";

		var td = document.createElement('td');
		tr.appendChild(td);
		td.className = "text-center";

		if (!previous_value)
			tendency = '<i class="fa fa-bars fa-lg"></i>';
		else {
			var tendency = value - previous_value;

			if (tendency < 0) {
				var colour = '';

				if (preferable_tendency == 'increase')
					colour = 'text-danger';
				else if (preferable_tendency == 'decrease')
					colour = 'text-success';

				tendency = '<i class="fa fa-arrow-down fa-lg ' + colour + '"></i>';
			}
			else if (tendency > 0) {
				var colour = '';

				if (preferable_tendency == 'increase')
					colour = 'text-success';
				else if (preferable_tendency == 'decrease')
					colour = 'text-danger';

				tendency = '<i class="fa fa-arrow-up fa-lg ' + colour + '"></i>';
			}
			else
				tendency = '<i class="fa fa-bars fa-lg"></i>';
		}

		td.innerHTML = tendency;
	}

	wesCountry.table.sort.apply();

	// Sort first column
	document.getElementById('country-values').sort(0);
}

/*
var timeline = new util.timelineChart({
	chartOptions: chartOptions['chart-timeline-comparison'],
	firstElement: null,
	secondElement: null,
	getfirstElementData: null,
	getSecondElementData: null
});

// API connection

var mainIndicatorObservations = [];

function getAPIInfo(indicator) {
	var region = 1; // Global

	ajax.loadObservations(region, indicator, function(data) {
		setTimeSelector(data.times);

		updateMap(selectedYear);
		updateCharts(selectedIndicator, selectedYear);
	});

	ajax.loadObservationsAverage(region, indicator, function(data) {
		mainIndicatorObservations = JSON.parse(data);
		timeline.updateFirstElement(indicator, mainIndicatorObservations);

		// First time
		if (!timeline.secondElementData())
			getCompareIndicatorObservations();
	});
}

// Get Indicator

function getIndicator(code) {
	var code = code ? code : document.getElementById('entity-id').value;
	var name = code;
	var index = 0;
	var topic = null;

	var indicator = document.querySelector('#all-indicator-select option[value="' + code + '"]')

	if (indicator) {
		name = indicator.innerHTML;
		index = indicator.index;
		topic = indicator.parentNode.label;
	}

	return {
		"code": code,
		"name": name,
		"index": index,
		"topic": topic
	}
}

function updateSelectorsByIndicator(code) {
	var indicator = getIndicator(code);

	var indicatorSelect = document.getElementById('all-indicator-select');
	indicatorSelect.selectedIndex = indicator.index;

	var topics = document.querySelectorAll('#topic-select option');

	for (var i = 0; i < topics.length; i++)
		if (topics[i].innerHTML == indicator.topic) {
			document.getElementById('topic-select').selectedIndex = topics[i].index;

			var indicatorSelect = selectTopic(topics[i].index + 1);
			indicatorSelect.style.display = 'block';

			var selected = indicatorSelect.querySelector('option[value="' + indicator.code + '"]');

			indicatorSelect.selectedIndex = selected ? selected.index : 0;

			break;
		}
}

updateSelectorsByIndicator();

// All indicator select

var allIndicators = document.getElementById('all-indicator-select');
allIndicators.onchange = changeIndicator;
allIndicators.onchange();

function changeIndicator() {
	selectedIndicator = this.options[this.selectedIndex].value;

	var texts = document.querySelectorAll('span.indicator-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;

	updateSelectorsByIndicator(selectedIndicator);

	var option = document.querySelector('#chart-timeline-comparison-indicator option[disabled]');
	if (option)
		option.disabled = false;

	var option = document.querySelector('#chart-timeline-comparison-indicator option[value="' + selectedIndicator + '"]');
	if (option)
		option.disabled = true;

	var option = document.querySelector('#chart-correlate-comparison-indicator option[disabled]');
	if (option)
		option.disabled = false;

	var option = document.querySelector('#chart-correlate-comparison-indicator option[value="' + selectedIndicator + '"]');
	if (option)
		option.disabled = true;

	indicatorComparerSelected(option.index);

	getAPIInfo(selectedIndicator);
}

//

function cloneObject(obj) {
	var o = {};

	for (var property in obj)
		o[property] = obj[property];

	return o;
}

var selectedYear = 2012;
var selectedIndicator = '';

// Charts

function updateCharts(selectedIndicator, selectedYear) {
	//updateTimelineChart(selectedIndicator, selectedYear);
	updateCorrelationChart(selectedIndicator, selectedYear);
	updateCountryTable(selectedIndicator, selectedYear);
}

// Timeline

// Correlation

function updateCorrelationChart(selectedIndicator, selectedYear) {
	region = 1;

	var compareIndicator = document.getElementById('chart-correlate-comparison-indicator');
	compareIndicator = compareIndicator.options[compareIndicator.selectedIndex].value;

	ajax.loadObservationsAverage(region, compareIndicator, function(data) {
		data = JSON.parse(data);

		var options = chartOptions['chart-correlation-comparison'];

		var container = document.querySelector(options.container);

		if (!container)
			return;

		var observations = {};
		var observationList = [];

		for (var i = 0; i < mainIndicatorObservations.length; i++) {
			var time = mainIndicatorObservations[i].time;

			observations[time] = {
				value1: mainIndicatorObservations[i].average,
				value2: null
			};

			observationList.push(time);
		}

		for (var i = 0; i < data.length; i++) {
			var time = data[i].time;

			if (observationList.indexOf(time) == -1)
				continue;

			observations[time].value2 = data[i].average;
		}

		options.series = [{
			'name': compareIndicator,
			'values': []
		}];

		if (!options.xAxis)
			options.xAxis = {};

		options.xAxis.values = [];

		for (var i = 0; i < observationList.length; i++) {
			var time = observationList[i];
			var node = observations[time];

			if (!node.value1 || !node.value2)
				continue;

			options.series[0].values.push([node.value1, node.value2]);

			options.xAxis.values.push(node.value1);
		}

		options.width = container.offsetWidth;
		options.height = container.offsetHeight;

		var chart = wesCountry.charts.scatterPlot(options);
		container.innerHTML = '';
		container.appendChild(chart.render());
	});
}

// Country table

function updateCountryTable(selectedIndicator, selectedYear) {
	var tbody = document.querySelector('#country-values tbody');

	if (!tbody)
		return;

	tbody.innerHTML = '';

	var path = document.getElementById('path').value;

	var countryList = ajax.getObservations().observations[selectedYear] ? ajax.getObservations().observations[selectedYear] : [];

	for (var i = 0; i < countryList.length; i++) {
		var code = countryList[i].code;
		var value = Number(countryList[i].value);
		var previous_value = Number(countryList[i].previous_value);
		var name = countryList[i].name;
		var lastUpdate = new Date(countryList[i].lastUpdate);

		var preferable_tendency = countryList[i].preferable_tendency;

		var tr = document.createElement('tr');
		tbody.appendChild(tr);

		var td = document.createElement('td');
		tr.appendChild(td);

		var sorter = document.createElement('span');
		sorter.appendChild(document.createTextNode(name));
		sorter.className = 'hidden';
		td.appendChild(sorter);

		var flag = document.createElement('img');
		flag.src = path + '/static/images/flags/' + code.toUpperCase() + ".png";
		flag.className = "flag";
		flag.onerror = function() {
			this.src = path + '/static/images/flags/no-flag.png'
		}

		td.appendChild(flag);
		td.appendChild(document.createTextNode(name));

		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = value.toFixed(2);
		td.className = "text-right";

		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = lastUpdate.toLocaleDateString();
		td.className = "text-center";

		var td = document.createElement('td');
		tr.appendChild(td);
		td.className = "text-center";

		if (!previous_value)
			tendency = '<i class="fa fa-bars fa-lg"></i>';
		else {
			var tendency = value - previous_value;

			if (tendency < 0) {
				var colour = '';

				if (preferable_tendency == 'increase')
					colour = 'text-danger';
				else if (preferable_tendency == 'decrease')
					colour = 'text-success';

				tendency = '<i class="fa fa-arrow-down fa-lg ' + colour + '"></i>';
			}
			else if (tendency > 0) {
				var colour = '';

				if (preferable_tendency == 'increase')
					colour = 'text-success';
				else if (preferable_tendency == 'decrease')
					colour = 'text-danger';

				tendency = '<i class="fa fa-arrow-up fa-lg ' + colour + '"></i>';
			}
			else
				tendency = '<i class="fa fa-bars fa-lg"></i>';
		}

		td.innerHTML = tendency;
	}

	wesCountry.table.sort.apply();

	// Sort first column
	document.getElementById('country-values').sort(0);
}

// Topic select

document.getElementById('topic-select').onchange = function() {
	if (indicatorSelect = selectTopic(this.selectedIndex + 1)) {
		indicatorSelect.style.display = 'block';
		indicatorSelect.selectedIndex = 0;
		indicatorSelect.onchange();
	}
}

function selectTopic(topicIndex) {
	var indicatorSelectors = document.querySelectorAll('select.topic-indicator-select');

	for (var i = 0; i < indicatorSelectors.length; i++)
		indicatorSelectors[i].style.display = 'none';

	var indicatorSelect = document.querySelector('select.topic-indicator-select:nth-of-type(' + topicIndex + ')');

	return indicatorSelect;
}

// Indicator select

var indicatorSelectors = document.querySelectorAll('select.topic-indicator-select');

for (var i = 0; i < indicatorSelectors.length; i++)
	indicatorSelectors[i].onchange = function() {
		var value = this.options[this.selectedIndex].value;

		var allIndicators = document.getElementById('all-indicator-select');

		for (var i = 0; i < allIndicators.options.length; i++) {
			if (allIndicators.options[i].value == value) {
				allIndicators.selectedIndex = i;
				allIndicators.onchange();

				break;
			}
		}
	};

// Comparison indicator select

var timelineComparisonIndicator = document.getElementById('chart-timeline-comparison-indicator');

timelineComparisonIndicator.onchange = function() {
	//updateTimelineChart(selectedIndicator, selectedYear);
	getCompareIndicatorObservations();
}

//timelineComparisonIndicator.selectedIndex = 1;
//timelineComparisonIndicator.onchange();

function getCompareIndicatorObservations() {
	var timelineComparisonIndicator = document.getElementById('chart-timeline-comparison-indicator');
	var compareIndicator = timelineComparisonIndicator.options[timelineComparisonIndicator.selectedIndex].value;

	//showTimelineLoading();

	var region = 1;

	ajax.loadObservationsAverage(region, compareIndicator, function(data) {
		timeline.updateSecondElement(compareIndicator, JSON.parse(data));
	});
}

// Correlate indicator select

var correlateComparisonIndicator = document.getElementById('chart-correlate-comparison-indicator');

correlateComparisonIndicator.onchange = function() {
	updateCorrelationChart(selectedIndicator, selectedYear);
}

//correlateComparisonIndicator.selectedIndex = 1;
//correlateComparisonIndicator.onchange();

function indicatorComparerSelected(index) {
	var comparer = document.getElementById('chart-timeline-comparison-indicator');
	apply(comparer, index);

	var comparer = document.getElementById('chart-correlate-comparison-indicator');
	apply(comparer, index);

	function apply(comparer, index) {
		if (comparer.selectedIndex == index) {
			if (index + 1 < comparer.options.length)
				comparer.selectedIndex = index + 1;
			else if (index - 1 >= 0)
				comparer.selectedIndex = index - 1;
		}
	}
}

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

			updateMap(selectedYear);
			updateCharts(selectedIndicator, selectedYear)
		}
	});
}

function updateMap(year) {
	var countryData = ajax.getObservations().observations[year] ? ajax.getObservations().observations[year] : [];

	var map = document.querySelector('#mapDiv .map-container');

	if (map)
		map.innerHTML = '';

	wesCountry.maps.createMap({
		container: '#mapDiv .map-container',
		"borderWidth": 1,
		"borderColour": '#aaa',
		countries: countryData,
		onCountryClick: function(info) {
			window.location.href = '/countries/' + info.iso3;
		}
	});
}

function random(min, max) {
	return ((Math.random() * max) + min);
}
*/

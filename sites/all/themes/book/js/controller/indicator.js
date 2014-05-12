var timeline = new util.timelineChart({
	chartOptions: chartOptions['chart-timeline-comparison'],
	firstElement: null,
	secondElement: null,
	getfirstElementData: null,
	getSecondElementData: null
});

// API connection

function getAPIInfo(indicator) {
	var region = 1; // Global

	ajax.loadObservations(region, indicator, function() {
		setTimeSelector(ajax.getObservations().times);	
		
		updateMap(selectedYear);
		updateCharts(selectedIndicator, selectedYear);
		
		ajax.loadObservationsAverage(region, indicator, function(data) {
			timeline.updateFirstElement(indicator, JSON.parse(data));
			
			// First time
			if (!timeline.secondElementData())
				getCompareIndicatorObservations();
		});	
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
	//updateCorrelationChart(selectedIndicator, selectedYear);
	updateCountryTable(selectedIndicator, selectedYear);
}

// Timeline
/*
function updateTimelineChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-timeline-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var compareIndicator = document.getElementById('chart-timeline-comparison-indicator');
	compareIndicator = compareIndicator.options[compareIndicator.selectedIndex].value;
	
	options.series = [{
		'name': selectedIndicator,
		'values': []
	}, {
		'name': compareIndicator,
		'values': []
	}];
	
	if (!options.xAxis)
		options.xAxis = {};
		
	options.xAxis.values = [];
	
	for (var i = 2008; i <= 2012; i++) {
		Math.seedrandom(selectedIndicator + i);
		options.series[0].values.push(random(1, 200));
		Math.seedrandom(compareIndicator + i);
		options.series[1].values.push(random(1, 200));
		
		options.xAxis.values.push(i);
	}
	
	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.lineChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}
*/
// Correlation

function updateCorrelationChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-correlation-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var compareIndicator = document.getElementById('chart-correlate-comparison-indicator');
	compareIndicator = compareIndicator.options[compareIndicator.selectedIndex].value;
	
	options.series = [{
		'name': selectedIndicator,
		'values': []
	}, {
		'name': compareIndicator,
		'values': []
	}];
	
	if (!options.xAxis)
		options.xAxis = {};
		
	options.xAxis.values = [];
	
	for (var i = 0; i < countryList.length; i++) {
		var code = countryList[i].iso3;
	
		Math.seedrandom(code + selectedIndicator + selectedYear);
		options.series[0].values.push([50 + i, random(50, 250)]);
		Math.seedrandom(code + compareIndicator + selectedYear);
		options.series[1].values.push([50 + i, random(50, 250)]);
		
		options.xAxis.values.push(i);
	}	
	
	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.scatterPlot(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
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
		var name = countryList[i].name;
		var lastUpdate = new Date(countryList[i].lastUpdate * 1000);
		
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
		
		var tendency = 1;
		
		switch(tendency) {
			case 1:
				tendency = '<i class="fa fa-bars fa-lg"></i>';
				break;
			case 2:
				tendency = '<i class="fa fa-arrow-down fa-lg text-danger"></i>';
				break;
			default:
				tendency = '<i class="fa fa-arrow-up fa-lg text-success"></i>';
				break;
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
	
/* Country list for map */

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
	
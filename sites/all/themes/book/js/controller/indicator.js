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
	},
	onCountryOver: util.mapOnCountryOver
});

// Ranking loader
/*
var rankingOptions = chartOptions['chart-ranking'];
rankingOptions.cache = true;
rankingOptions.getChartData = function(options, data) {
		data = JSON.parse(data);

		options.series = data.all_countries;
		options.foot = getDatasourceLink(data.organization_id, data.organization_name);

		// Legend
		var legendElements = options.getLegendElements(options);
		var length = legendElements.length;
		var legend = document.getElementById("ranking-legend");
		legend.innerHTML = "";

		for (var i = 0; i < length; i++) {
			var element = legendElements[i];
			var name = element.name;
			var colour = options.getElementColour(options, element, i);

			var div = document.createElement("div");
			div.className = "col-xs-2";
			legend.appendChild(div);

			var circle = document.createElement("div");
			circle.className = "circle";
			circle.style.backgroundColor = colour;
			div.appendChild(circle);

			var span = document.createElement("span");
			span.innerHTML = name;
			div.appendChild(span);
		}

		return options;
};

var rankingLoader = wesCountry.loader.renderChart(rankingOptions);
*/
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

				// Set indicator name
				setIndicatorName(selectors["#indicator-select"]);

				// Set indicator description
				loadDescription(parameters);

				// Load map
				loadMap(parameters);

				// Load ranking
				//loadRanking(parameters);

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

				// Load ranking
				//loadRanking(parameters);

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

function loadDescription(parameters) {
	var indicator = parameters["indicator"];

	wesCountry.ajax.load({
		url: ajaxURL + '/indicator_description.php',
		parameters: String.format("indicator={0}&language={1}",
															indicator, languageCode),
		callback: function(info) {
			info = JSON.parse(info);
			var description = info.description;

			document.getElementById('indicator-description').innerHTML = description;
		}
	})
}

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

// Refresh ranking

function loadRanking(parameters) {
	var region = 1; // Global
	var indicator = parameters["indicator"];

	rankingLoader.load({
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
		var title = option.title;

		// If indicator in query then set as selected
		if (value == indicator)
			selectedIndex = i;

		option = document.createElement('option');
		option.value = value;
		option.innerHTML = html;
		option.title = title;
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

	var debateLink = document.getElementById('debate-link');
	debateLink.href = '/search/site/' + indicatorName;
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
			this.src = path + '/static/images/flags/NO-FLAG.png'
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

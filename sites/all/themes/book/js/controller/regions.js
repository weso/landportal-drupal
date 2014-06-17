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
		var data = JSON.parse(mapLoader.getData());
		updateCompareChart(data.by_year[element] ? data.by_year[element] : []);
	},
	getChartData: function(options, data) {
		data = JSON.parse(data);
		options["countries"] = data.all;

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

		var serie1 = document.getElementById('region-select').value;
		var serie2 = document.getElementById('region-comparing-select').value;

		series.push(data.series[serie1]);

		if (data.series[serie2])
			series.push(data.series[serie2]);

		options.series = series
		options.xAxis.values = data.times;

		// Update legend

		document.getElementById('compare-legend-circle-1').style.backgroundColor = options.serieColours[0];
		document.getElementById('compare-legend-circle-2').style.backgroundColor = options.serieColours[1];

		document.getElementById('compare-legend-text-1').innerHTML = series && series.length > 0 ? series[0].name : "";
		document.getElementById('compare-legend-text-2').innerHTML = series && series.length > 1 ? series[1].name : "";

		return options;
};

var timelineLoader = wesCountry.loader.renderChart(timelineOptions);

////////////////////////////////////////////////////////////////////////////////
//                                PAGE STATE
////////////////////////////////////////////////////////////////////////////////

var pageStatus = wesCountry.stateful.start({
	init: function(parameters, selectors) {
		// We cannot allow to compare to the same region
		updateComparingRegionSelector(parameters["region"]);

		// Update region names in view
		updateRegionNames(document.getElementById('region-select'));
	},
	urlChanged: function(parameters, selectors) {
		var indicatorSelector = document.getElementById('indicator-select');
		indicator = indicatorSelector.options[indicatorSelector.selectedIndex].innerHTML;

		var regionSelector = document.getElementById('region-select');
		region = regionSelector.options[regionSelector.selectedIndex].innerHTML;

		var description = String.format("{0}: {1} @landportal", region, indicator);
		var url = document.URL;

		util.generateShareLinks(url, description);
	},
  elements: [
    {
      name: "region",
			value: "1",
      selector: "#region-select",
      onChange: function(index, value, parameters, selectors) {
        // Load map
				loadMap(parameters);

				// Load comparing timeline
				loadComparingTimeline(parameters);

				// We cannot allow to compare to the same region
				updateComparingRegionSelector(parameters["region"]);

				// Update region names in view
				updateRegionNames(this);
      }
    },
    {
      name: "datasource",
      selector: "#source-select",
			ignore: true,
			selectedIndex: function(parameters, selectors) {
				// If no indicator in query then first element is selected
				// Else the source for that indicator is selected
				return getSourceFromSelectedIndicator(parameters, selectors);
			},
      onChange: function(index, value, parameters, selectors) {
				// When a source is selected then its first indicator is selected
				var indicatorSelect = document.getElementById('indicator-select');

				// Get datasource label of selected indicator
				var indicator = parameters["indicator"];
				var selectedIndicatorOption = document.querySelector('#indicator-select option[value="' + indicator + '"]');
				var selectedIndicatorParentLabel = selectedIndicatorOption && selectedIndicatorOption.parentNode ?
					selectedIndicatorOption.parentNode.label : "-1";

				// Get this datasource label
				var indicatorOption = document.querySelector('#indicator-select optgroup[value="' + value + '"] option:first-child');
				var indicatorParentLabel = indicatorOption && indicatorOption.parentNode ?
					indicatorOption.parentNode.label : "-2";

				if (selectedIndicatorParentLabel && indicatorParentLabel && selectedIndicatorParentLabel == indicatorParentLabel) {
					console.log("Init: source")
				}
				// If two labels are different then the indicator is updated
				else if (indicatorOption) {
					indicatorSelect.selectedIndex = indicatorOption.index;
					indicatorSelect.refresh();
				}
      }
    },
		{
			name: "indicator",
			selector: "#indicator-select",
			onChange: function(index, value, parameters, selectors) {
				// When an indicator is selected we select the corresponding datasource
				var source = this.options[this.selectedIndex].parentNode.label;

				var sourceSelect = document.getElementById('source-select');

				for (var i = 0; i < sourceSelect.options.length; i++) {
					if (sourceSelect.options[i].innerHTML == source) {
						sourceSelect.selectedIndex = sourceSelect.options[i].index;

						break;
					}
				}

				indicatorChanged(parameters, selectors);
			}
		},
		{
			name: "comparing-region",
			selector: "#region-comparing-select",
			onChange: function(index, value, parameters, selectors) {
				// Load comparing timeline
				loadComparingTimeline(parameters);
			}
		}
  ]
});

// When a country is selected we move to country view
document.getElementById('country-select').onchange = function() {
	window.location.href = '/book/countries/' + this.options[this.selectedIndex].value;
}

////////////////////////////////////////////////////////////////////////////////
//                                CHARTS
////////////////////////////////////////////////////////////////////////////////

// Refresh map

function loadMap(parameters) {
	var region = parameters["region"];
	var datasource = parameters["datasource"];
	var indicator = parameters["indicator"];

	mapLoader.load({
		url: ajaxURL + '/observations_by_region.php',
		parameters: String.format("region={0}&indicator={1}&language={2}",
															region, indicator, languageCode),
		foot: getDatasourceLink(datasource)
	});
}

// Refresh comparing timeline

function loadComparingTimeline(parameters) {
	var region1 = parameters["region"];
	var region2 = parameters["comparing-region"];
	var indicator = parameters["indicator"];
	var datasource = parameters["datasource"];

	if (region2 === "")
		return;

	timelineLoader.load({
		url: ajaxURL + '/observations_by_region_average.php',
		parameters: String.format("region1={0}&region2={1}&indicator={2}&language={3}",
															region1, region2, indicator, languageCode),
		foot: getDatasourceLink(datasource)
	});
}

// Load Bar Chart

function updateCompareChart(countries) {
	var options = chartOptions['chart-region-bar-comparison'];

	var container = options.container;

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
		var observation = countries[i];

		var serie = {
			'name': observation.countryName,
			'values': [
				observation.value
			],
			'time': observation.time
		};

		options.series.push(serie);
	}

	for (var i = 0; i < countries.length; i++) {
		options.serieColours.push(wesCountry.makeGradientColour(colour1, colour2, (i / countries.length) * 100).cssColour);
	}

	options.series.sort(function(a, b) {
		return b.values[0] - a.values[0];
	});

	options.width = container.offsetWidth;
	options.height = container.offsetHeight;

	options.foot = getDatasourceLink(document.getElementById('source-select').value);

	document.querySelector(container).innerHTML = '';
	wesCountry.charts.multiChart(options);
}

////////////////////////////////////////////////////////////////////////////////
//                                AUXILIARY
////////////////////////////////////////////////////////////////////////////////

function indicatorChanged(parameters, selectors) {
	// Load map
	loadMap(parameters);

	// Load comparing timeline
	loadComparingTimeline(parameters);

	// Update indicator names in view
	var texts = document.querySelectorAll('span.indicator-name');

	var value = selectors["#indicator-select"].options[selectors["#indicator-select"].selectedIndex].innerHTML;

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = value;
}

function getSourceFromSelectedIndicator(parameters, selectors) {
	var indicator = parameters["indicator"];
	var selector = selectors['#indicator-select'];

	var source = -1;

	if (selector.value == indicator) {
		var sourceOpt = selector.options[selector.selectedIndex].parentNode;

		if (sourceOpt) {
			var sources = selector.querySelectorAll('optgroup');

			if (sources && sources.indexOf)
				source = sources.indexOf(sourceOpt);
		}
	}

	if (source == -1) {
		// We must find a non-disabled option
		var firstEnabledOption = selectors['#source-select'].querySelector('option:not([disabled])');

		if (firstEnabledOption)
			source = firstEnabledOption.index;
	}

	return source;
}

function updateComparingRegionSelector(region) {
	var option = document.querySelector('#region-comparing-select option[disabled]');

	if (option)
		option.disabled = false;

	var option = document.querySelector('#region-comparing-select option[value="' + region + '"]');

	if (option)
		option.disabled = true;

	var comparer = document.getElementById('region-comparing-select');
	var index = option.index;

	if (comparer.selectedIndex == index) {
		if (index + 1 < comparer.options.length)
			comparer.selectedIndex = index + 1;
		else if (index - 1 >= 0)
			comparer.selectedIndex = index - 1;
	}

	comparer.refresh();
}

function updateRegionNames(selector) {
	// Update region name in view
	var texts = document.querySelectorAll('span.region-name');

	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = selector.options[selector.selectedIndex].innerHTML;
}

function getDatasourceLink(datasource) {
	var datasourceSelector = document.getElementById('source-select');
	var datasourceName = datasourceSelector.options[datasourceSelector.selectedIndex] ?
		datasourceSelector.options[datasourceSelector.selectedIndex].innerHTML : "";

	return String.format("source: <a href='/book/sources/{0}'>{1}</a>", datasource, datasourceName)
}

var util = new (function() {
	this.timelineChart = function(options) {
		// options.chartOptions
		// options.firstElement
		// options.secondElement
		// options.getfirstElementData
		// options.getSecondElementData

		var chartOptions = clone(options.chartOptions);

		var firstElementData = null;
		var secondElementData = null;

		(function() {
			if (options.getFirstElementData) {
				options.getFirstElementData(function(data) {
					firstElementData = data;
				});
			}

			if (options.getSecondElementData) {
				options.getSecondElementData(function(data) {
					secondElementData = data;
				});
			}

			generateChart();
		})();

		this.updateFirstElement = function(firstElement, data) {
			options.firstElement = firstElement;
			firstElementData = data;
			generateChart();
		}

		this.updateSecondElement = function(secondElement, data) {
			options.secondElement = secondElement;
			secondElementData = data;
			generateChart();
		}

		this.firstElementData = function() {
			return firstElementData;
		}

		this.secondElementData = function() {
			return secondElementData;
		}

		function generateChart() {
			var container = document.querySelector(chartOptions.container);

			if (!container)
				return;

			if (!firstElementData || !secondElementData)
				return;

			container.innerHTML = '';

			var firstSeries = normalizeSeries(firstElementData);
			var secondSeries = normalizeSeries(secondElementData);

			var series = mergeSeries(firstSeries, secondSeries);

			chartOptions.series = [{
				'name': options.firstElement,
				'values': series.values1
			}, {
				'name': options.secondElement,
				'values': series.values2
			}];

			if (!chartOptions.xAxis)
				chartOptions.xAxis = {};

			chartOptions.xAxis.values = series.axis;

			chartOptions.width = container.offsetWidth;
			chartOptions.height = container.offsetHeight;
console.log(chartOptions)
			wesCountry.charts.chart(chartOptions);
		}

		return this;
	}

	function normalizeSeries(data) {
		var processedData = {
			axis: [],
			valuesPerYear: {}
		};

		for (var i = 0; i < data.length; i++) {
			var time = data[i].time;
			var value = data[i].average;

			if (time == 'all')
				continue;

			processedData.axis.push(time);
			processedData.valuesPerYear[time] = value;
		}

		processedData.axis.sort();

		return processedData;
	}

	function mergeSeries(series1, series2) {
		var data = {
			values1: [],
			values2: [],
			axis: []
		};

		for (var i = 0; i < series1.axis.length; i++)
			data.axis.push(series1.axis[i]);

		for (var i = 0; i < series2.axis.length; i++)
			if (data.axis.indexOf(series2.axis[i]) == -1)
				data.axis.push(series2.axis[i]);

		data.axis.sort();

		for (var i = 0; i < data.axis.length; i++) {
			var time = data.axis[i];

			var value1 = series1.valuesPerYear[time] ? series1.valuesPerYear[time] : null;
			var value2 = series2.valuesPerYear[time] ? series2.valuesPerYear[time] : null;

			data.values1.push(value1);
			data.values2.push(value2);
		}

		return data;
	}

	function clone(obj){
			if(obj == null || typeof(obj) != 'object')
					return obj;

			var temp = obj.constructor();

			for(var key in obj)
					temp[key] = clone(obj[key]);
			return temp;
	}
})();

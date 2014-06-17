var chartOptions = {
	"main-index-rankings": {
		container: "#main-index-rankings",
		chartType: "polar",
		margins: [0, 0, 0, 0],
		legend: {
			show: false
		},
		serieColours: ["#ff7f0e", "#ff7f0e", "#2b00f5", "#00af10"],
		xAxis: {
			margin: 1,
			"font-colour": "#888",
			"font-size": "0.8em"
		},
		yAxis: {
			margin: 12,
		},
    tablePosition: "below",
    selectBy: "byIndicator"
	},
	"rural-development-1": {
		container: "#rural-development-1",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 0, 0],
		serieColours: ["#ddd", "#ff7f0e"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
    tablePosition: "below",
    selectBy: "byIndicator"
	},
	"rural-development-2": {
		container: "#rural-development-2",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 2, 0],
		serieColours: ["#ddd", "#1184a7"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
    tablePosition: "below",
    selectBy: "byIndicator"
	},
	"rural-development-3": {
		container: "#rural-development-3",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 2, 0],
		serieColours: ["#ddd", "#00af10"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
    tablePosition: "below",
    selectBy: "byIndicator"
	},
	"chart-ranking": {
		container: "#chart-ranking",
		chartType: "ranking",
		margins: [3, 0, 1, 0],
		groupMargin: 0,
		barMargin: 4,
		valueOnItem: {
			show: true,
			"font-colour": "#fff",
			"font-size": "9pt"
		},
		serieColours: ["#A1CA25", "#01A9DB", "#065D77", "#088A29", "#218655",
									"rgba(161,202,37,0.4)", "rgba(1,169,219,0.4)", "rgba(6, 93, 119, 0.4)",
									"rgba(8,138,41,0.4)", "rgba(33, 134, 85, 0.4)"],
		xAxis: {
			title: "",
			margin: 10,
			colour: "#ccc",
			"font-colour": "#666"
		},
		yAxis: {
			title: "",
			margin: 0
		},
		legend: {
			show: false
		},
		maxRankingRows: 12,
		rankingElementShape: "square",
		events: {
	    "onmouseover": util.tooltipRanking
		},
		getElementColour: function(options, element, index) {
			var pos = 0;

			switch(element.continent) {
			case "150":
					pos = 0;
					break;
				case "19":
					pos = 1;
					break;
				case "2":
					pos = 2;
					break;
				case "142":
					pos = 3;
					break;
				case "9":
					pos = 4;
					break;
			}

			var colours = options.serieColours;
			var pos = element.value ? pos : pos + 5;

			return colours[pos % colours.length];
		},
		getLegendElements: function(options) {
			var elements = [];

			var continents = [];

			var series = options.series;
			var length = series.length;

			for (var i = 0; i < length; i++) {
				var continent = series[i].continent;
				var continentName = series[i].continent_name;

				if (elements.indexOf(continent) == -1) {
					elements.push(continent);

					continents.push({
						name: continentName,
						continent: continent,
						value: -1
					});
				}
			}

			continents.sort(function(a, b) {
				return a.name > b.name;
			});

			return continents;
		}
	},
	"chart-region-bar-comparison": {
		container: "#chart-region-bar-comparison",
		chartType: "bar",
		download: true,
		margins: [6, 0, 6, 4],
		groupMargin: 0,
		barMargin: 2,
		xAxis: {
			title: "Countries",
			"font-colour": "none",
			"font-size": "0.8em"
		},
		yAxis: {
			title: "",
			"font-colour": "#888",
			"font-size": "0.7em"
		},
		mean: {
			show: true,
			stroke: 2
		},
		valueOnItem: { show: false },
		legend: {
			show: false
		},
		serieColours: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896"],
    tablePosition: "below",
    selectBy: "byTime",
    download: true,
		events: {
			"onmouseover": util.tooltipRegion
		}
	},
	"chart-timeline-comparison": {
		container: "#chart-timeline-comparison",
		chartType: ["line", "bar", "area", "stacked"],
		margins: [6, 0, 6, 4],
		xAxis: {
			title: "",
			"font-colour": "none",
			"font-size": "1em",
			values: []
		},
		yAxis: {
			"font-colour": "#888",
			"font-size": "0.7em",
			title: "",
		},
		mean: {
			show: true,
			stroke: 1
		},
		serieColours: ["#0489B1", "#ff7f0e", "#2b00f5", "#00af10"],
    selectBy: "byIndicator",
    vertex: { "show": true },
    valueOnItem: { show: false },
    legend: {
		show: false
		},
		stroke: {
			width: 3
		},
		download: true,
		events: {
			"onmouseover": util.tooltipIndicator
		}
	},
	"chart-timeline-comparison-small": {
		chartType: "line",
		margins: [6, 0, 6, 0],
		yAxis: { title: "" },
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
        selectBy: "byIndicator",
        vertex: { "show": true },
        valueOnItem: { show: false },
        yAxis: {
			"font-colour": "none",
			"font-size": "1em"
		},
        legend: {
			show: false
		},
		vertex: {
			"show": false
		},
		stroke: {
			width: 1
		}
	},
	"chart-correlation-comparison": {
		container: "#chart-correlation-comparison",
		chartType: "scatter",
		sizeByValue: true,
		margins: [2, 3, 8, 1],
		xAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "12px",
			"font-colour": "#888"
		},
		yAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "12px",
			"font-colour": "#888",
			"margin": 14
		},
		legend: {
			show: false
		},
		serieColours: ["rgba(254, 46, 100, 0.7)"],
		events: {
			"onmouseover": util.tooltipIndicator
		}
	},
	"starred-indicator": {
		container: "",
		yAxis: { "font-colour": "none"},
		xAxis: {
			"font-colour": "none"
		},
		margins: [10, 0, 0, 0],
		chartType: "area",
		serieColours: ["#0489B1", "#ff7f0e", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		},
		stroke: {
			width: 1
		}
	}
}

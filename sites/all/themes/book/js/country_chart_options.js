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
			margin: 5,
			"font-colour": "#888",
			"font-size": "0.8em"
		},
        tablePosition: "below",
        selectBy: "byRegion"
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
		valueOnItem: { show: false },
		legend: {
			show: false
		},
		serieColours: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896"],
    tablePosition: "below",
    selectBy: "byTime",
    download: true
	},
	"chart-timeline-comparison": {
		container: "#chart-timeline-comparison",
		chartType: ["line", "bar", "area", "polar"],
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
		download: true
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
		serieColours: ["#d67777", "#ff7f0e", "#0489B1", "#2b00f5", "#00af10"]
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

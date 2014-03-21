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
        selectBy: "byTime"
	},
	"rural-development-1": {
		container: "#rural-development-1",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 0, 0],
		serieColours: ["#ff7f0e", "#8A0829", "#2b00f5", "#00af10"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
        tablePosition: "below",
        selectBy: "byTime"
	},
	"rural-development-2": {
		container: "#rural-development-2",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 2, 0],
		serieColours: ["#ff7f0e", "#8A0829", "#2b00f5", "#00af10"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
        tablePosition: "below",
        selectBy: "byTime"
	},
	"rural-development-3": {
		container: "#rural-development-3",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 2, 0],
		serieColours: ["#ff7f0e", "#8A0829", "#2b00f5", "#00af10"],
		xAxis: {
			"font-colour": "none",
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
        tablePosition: "below",
        selectBy: "byTime"
	},
	"chart-region-bar-comparison": {
		container: "#chart-region-bar-comparison",
		chartType: "bar",
		margins: [6, 0, 6, 0],
		groupMargin: 0,
		barMargin: 2,
		xAxis: {
			title: "Countries",
			"font-colour": "none",
			"font-size": "0.8em"
		},
		yAxis: {
			"font-colour": "#888",
			"font-size": "1em"
		},
		valueOnItem: { show: false },
		legend: {
			show: false
		},
		serieColours: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896"],
        tablePosition: "below",
        selectBy: "byTime"
	},
	"chart-timeline-comparison": {
		container: "#chart-timeline-comparison",
		chartType: "line",
		margins: [6, 0, 6, 0],
		yAxis: { title: "" },
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
        selectBy: "byIndicator",
        vertex: { "show": true },
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"chart-correlation-comparison": {
		container: "#chart-correlation-comparison",
		margins: [4, 2, 1, 0],
		xAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px"
		},
		yAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "12px"
		},
		legend: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px"
		},	
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"]
	},
	"land-1": {
		container: "#land-1",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"land-2": {
		container: "#land-2",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"land-3": {
		container: "#land-3",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"land-4": {
		container: "#land-4",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"gender-1": {
		container: "#gender-1",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"gender-2": {
		container: "#gender-2",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"gender-3": {
		container: "#gender-3",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"gender-4": {
		container: "#gender-4",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"hunger-1": {
		container: "#hunger-1",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"hunger-2": {
		container: "#hunger-2",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"hunger-3": {
		container: "#hunger-3",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	},
	"hunger-4": {
		container: "#hunger-4",
		yAxis: { "font-colour": "none"},
		margins: [10, 4, 0, 4],
		chartType: "line",
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
		vertex: { "show": false },
        selectBy: "byIndicator",
        valueOnItem: { show: false },
        legend: {
			show: false
		}
	}
}		
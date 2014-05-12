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
		margins: [6, 0, 6, 2],
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
        selectBy: "byTime"
	},
	"chart-timeline-comparison": {
		container: "#chart-timeline-comparison",
		chartType: "line",
		margins: [6, 0, 6, 2],
		xAxis: {
			title: "",
			"font-colour": "none",
			"font-size": "1em",
			values: []		
		},
		yAxis: { 
			title: "",
		},
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
        selectBy: "byIndicator",
        vertex: { "show": true },
        valueOnItem: { show: false },
        legend: {
			show: false
		},
		stroke: {
			width: 3
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
	"starred-indicator": {
		container: "#land-1",
		yAxis: { "font-colour": "none"},
		xAxis: {
			"font-colour": "none"
		},
		margins: [10, 0, 0, 0],
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
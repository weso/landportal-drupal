var chartOptions = {
	"main-index-rankings": {
		container: "#main-index-rankings",
		chartType: "polar",
		margins: [0, 0, 0, 0],
		legend: {
			show: false
		},
		serieColours: ["#d67777", "#8A0829", "#2b00f5", "#00af10"],
		xAxis: {
			margin: 5
		},
        tablePosition: "below",
        selectBy: "byTime"
	},
	"rural-development": {
		container: "#rural-development",
		chartType: "pie",
		valueOnItem: { show: false },
		margins: [0, 0, 0, 0],
		serieColours: ["#ff0002", "#8A0829", "#2b00f5", "#00af10"],
		xAxis: {
			"font-size": "0.8em"
		},
		legend: {
			show: false
		},
        tablePosition: "below",
        selectBy: "byTime"
	},
	"employment-agriculture": {
		container: "#employment-agriculture",
		chartType: "bar",
		margins: [6, 0, 6, 0],
		xAxis: {
			title: "Countries",
			"font-colour": "none",
			"font-size": "0.8em"
		},
		valueOnItem: { show: false },
		legend: {
			show: false
		},
		serieColours: ["#1184A7", "#1F95B2", "#2EA6BE", "#3CB7C9", "#555", "#59DAE0", "#68EBEC", "#77FDF8"],
        tablePosition: "below",
        selectBy: "byTime"
	},
	"employment-timeline": {
		container: "#employment-timeline",
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
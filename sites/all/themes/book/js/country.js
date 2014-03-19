function cloneObject(obj) {
	var o = {};
	
	for (var property in obj)
		o[property] = obj[property];
		
	return o;
}


function showBySource(source) {
	for (var element in chartOptions) {
	    var options = cloneObject(chartOptions[element]);
	
	    options.container += ' div.source-' + source;
	    var container = options.container;

	    if (!container)
	        continue;
	
	    container = document.querySelector(container);

	    if (!container)
	        continue;
	        
	    container.style.display = 'block';
	     
	    var innerDiv = container.querySelector(options.container + ' div');
console.log(	options.container + ' div')  
	    if (innerDiv)
	    	container.removeChild(innerDiv);
	
	    options.width = container.parentNode.offsetWidth;
	    options.height = container.parentNode.offsetHeight;
	
	    var selectBy = options.selectBy ? options.selectBy : "byTime";
	
	    wesCountry.data.parseTable(options, selectBy);
	}
}

showBySource('hunger')

/* Source select */

var sourceSelect = document.getElementById('source-select');
sourceSelect.selectedIndex = 0;

sourceSelect.onchange = function() {
	var source = this.options[this.selectedIndex].value;
	
	var indicatorSelect = document.getElementById('indicator-select');
	
	var title = 'Employment in Agriculture';
	//var elements = [];
	
	if (this.selectedIndex == 0) {
		indicatorSelect.options[0].innerHTML = title = 'Employment in Agriculture';
		//elements = document.querySelectorAll('.source-hunger');
	}
	else {
		indicatorSelect.options[0].innerHTML = title = 'Employment in Social Institutions';
		//selements = document.querySelectorAll('.source-hunger');
	}
	
	var titles = document.querySelectorAll('.graph-section h2.section:not(:first-of-type) span');
	
	for (var i = 0; i < titles.length; i++) {
		titles[i].innerHTML = title + ' FOR COUNTRIES IN THE REGION';
	}

	var graphs = document.querySelectorAll('.source-graph');
	
	for (var i = 0; i < graphs.length; i++)
		graphs[i].style.display = 'none';
/*		
	for (var i = 0; i < elements.length; i++)
		elements[i].style.display = 'block';
*/		
	showBySource(source);
}

/* Country select */

document.getElementById('country-select').onchange = function() {
	
	window.location.href = '/countries/' + this.options[this.selectedIndex].value;
}

/* Timeline */

document.getElementById('country-comparison').onchange = showTimeline;

function showTimeline() {
	var timelineOptions = {
		container: "#employment-timeline",
		chartType: "line",
		margins: [6, 0, 6, 0],
		yAxis: { title: "" },
		serieColours: ["#ff7f0e", "#0489B1", "#2b00f5", "#00af10"],
        selectBy: "byIndicator",
        vertex: { "show": true },
        valueOnItem: { show: false },
        yAxis: {
			"font-colour": "#888",
			"font-size": "1em"
		},
        legend: {
			show: false
		},
		series: [{
            name: "2012",
            values: [6, 4, 5, 5, 6]
        },
        {  
        	name: "2013",
         	values: [50, 7.4, 15, 1, 2]
        }]
	};
	
	var timelineContainer = document.getElementById('employment-timeline');
	
	timelineOptions.width = timelineContainer.offsetWidth;
	timelineOptions.height = timelineContainer.offsetHeight;
	
	timelineContainer.innerHTML = '';
	
	for (var i = 0; i < timelineOptions.series[1].values.length; i++)
		timelineOptions.series[1].values[i] = Math.floor((Math.random() * 50) + 1);
	
	var chart = wesCountry.charts.lineChart(timelineOptions);
	timelineContainer.appendChild(chart.render());
	
	/* Smalls */
	
	showTimelineSmall('land-1');
	showTimelineSmall('land-2');
	showTimelineSmall('land-3');
	showTimelineSmall('land-4');
	
	showTimelineSmall('gender-1');
	showTimelineSmall('gender-2');
	showTimelineSmall('gender-3');
	showTimelineSmall('gender-4');
	
	showTimelineSmall('hunger-1');
	showTimelineSmall('hunger-2');
	showTimelineSmall('hunger-3');
	showTimelineSmall('hunger-4');
}

function showTimelineSmall(container) {
	var timelineOptions = {
		container: "#employment-timeline",
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
		vertex: { "show": false },
		series: [{
            name: "2012",
            values: [6, 4, 5, 5, 6]
        },
        {  
        	name: "2013",
         	values: [50, 7.4, 15, 1, 2]
        }]
	};
	
	var timelineContainer = document.getElementById(container);
	
	timelineOptions.width = timelineContainer.offsetWidth;
	timelineOptions.height = timelineContainer.offsetHeight;
	
	timelineContainer.innerHTML = '';
	
	for (var i = 0; i < timelineOptions.series[1].values.length; i++)
		timelineOptions.series[1].values[i] = Math.floor((Math.random() * 50) + 1);
	
	var chart = wesCountry.charts.lineChart(timelineOptions);
	timelineContainer.appendChild(chart.render());
}
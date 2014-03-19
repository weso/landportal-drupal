/* Chart type buttons */

var chartType = 'bar';
renderChart(chartType);

function selectTypeButton(button) {
	// Unselect previous selected button
	var selected = document.querySelector('.widget-button-selected');
	var selectedImg = document.querySelector('.widget-button-selected img');
	
	selected.className = selected.className.replace(' widget-button-selected', '');
	selectedImg.src = selectedImg.src.replace('-selected.png', '.png');
	
	// This button
	button.className += ' widget-button-selected';
	
	var img = button.querySelector('img');
	
	if (img)
		img.src = img.src.replace('.png', '-selected.png');
		
	chartType = button.getAttribute('chart-type');
	
	renderChart(chartType);
}

var typeButtons = document.querySelectorAll('.widget-chart-button');

for (var i = 0; i < typeButtons.length; i++)
	typeButtons[i].onclick = function() {
		selectTypeButton(this);
	}
	
/* Chart descriptions */

document.getElementById('title').onkeyup = function() {
	document.getElementById('chart-title').innerHTML = this.value;
}

document.getElementById('description').onkeyup = function() {
	document.getElementById('chart-description').innerHTML = this.value;
}

var label_x = 'Years';
var label_y = 'Values';

document.getElementById('label_x').onkeyup = function() {
	label_x = this.value;
	renderChart(chartType, label_x, label_y);
}

document.getElementById('label_y').onkeyup = function() {
	label_y = this.value;
	renderChart(chartType, label_x, label_y);
}

/* Chart preview */

function renderChart(type, label_x, label_y) {
	var options = {
		sortSeries: true,
		margins: [10, 10, 10, 1],
		xAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px",
			title: label_x ? label_x : "Years",
			values: ["Jan", "Feb", "Mar", "Apr", "May"],
		},
		yAxis: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "12px",
			title: label_y ? label_y : "Values"
		},
		legend: {
			"font-family": "'Kite One', sans-serif",
			"font-size": "14px"
		},
		series: [
		{
	        name: "2012",
	        values: [100, 200, 300]
	    },
	    {  
	    	name: "2013",
	     	values: [50, 5, 40]
	    }]
	};
	
	var mapDiv = document.getElementById("mapDiv");
	mapDiv.innerHTML = '';
	
	options.width = mapDiv.offsetWidth;

	switch(type) {
		case 'bar':
			var chart = wesCountry.charts.barChart(options);
			break;
		case 'line':
			var chart = wesCountry.charts.lineChart(options);
			break;
		case 'pie':
			var chart = wesCountry.charts.pieChart(options);
			break;
		case 'area':
			var chart = wesCountry.charts.areaChart(options);
			break;
		case 'polar':
			var chart = wesCountry.charts.polarChart(options);
			break;
		case 'scatter':
			var chart = wesCountry.charts.scatterPlot(options);
			break;
	}
	
	mapDiv.appendChild(chart.render());
}
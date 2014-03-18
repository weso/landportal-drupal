var options = {
	sortSeries: true,
	margins: [10, 10, 10, 1],
	xAxis: {
		"font-family": "'Kite One', sans-serif",
		"font-size": "14px",
		title: "Years",
		values: ["Jan", "Feb", "Mar", "Apr", "May"],
	},
	yAxis: {
		"font-family": "'Kite One', sans-serif",
		"font-size": "12px"
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

options.width = mapDiv.offsetWidth;
var chart = wesCountry.charts.barChart(options);

mapDiv.appendChild(chart.render());
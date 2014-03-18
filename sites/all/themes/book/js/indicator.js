function cloneObject(obj) {
	var o = {};
	
	for (var property in obj)
		o[property] = obj[property];
		
	return o;
}

// Charts

function showChartsByTopic(region) {
	var charts = document.querySelectorAll('.topic-chart');

	for (var i = 0; i < charts.length; i++)
		charts[i].style.display = 'none';

	for (var element in chartOptions) {
	    var options = cloneObject(chartOptions[element]);
	
	    options.container += ' div.topic-' + region;
	    var container = options.container;
	
	    if (!container)
	        continue;
	
	    container = document.querySelector(container);
	
	    if (!container)
	        continue;
	        
	    container.style.display = 'block';
	        
	    var innerDiv = container.querySelector('div');
	   
	    if (innerDiv)
	    	container.removeChild(innerDiv);
	
	    options.width = container.parentNode.offsetWidth;
	    options.height = container.parentNode.offsetHeight;
	
	    var selectBy = options.selectBy ? options.selectBy : "byTime";
	
	    wesCountry.data.parseTable(options, selectBy);
	}
}

showChartsByTopic('agriculture');
document.getElementById('topic-select').selectedIndex = 0;

// Map

function loadHeatMap(region, year) {
	var countryData = {};
	
	var countries = document.querySelectorAll('.heat-map.topic-' + region + '.year-' + year + ' tbody tr');
	
	for (var i = 0; i < countries.length; i++) {
		var children = countries[i].querySelectorAll('td');
	
		var code = children[0].innerHTML;
		var value = children[1].innerHTML;
		
		countryData[code] = value;
	}
		
	function loadMap() {
		$('#mapDiv .map-container').empty().vectorMap({
		    map: 'world_mill_en',
		    series: {
		      regions: [{
		        values: countryData,
		        scale: ['#1184a7', '#A9F5BC'],
		        normalizeFunction: 'polynomial'
		      }]
		    },
		    zoomOnScroll: false,
		    backgroundColor: "#fff",
		    onRegionLabelShow: function(e, el, code){
			    $('.country-label').stop().fadeIn().html(el.html()).delay(1000).fadeOut(1500);
			    e.preventDefault();
			},
			onRegionClick: function(event, code) {
				console.log(code);
				window.location.href = '/countries/' + convertCode(code)
			}
		  });
	}
	
	window.onresize = loadMap;
	
	loadMap();
}

function convertCode(code) {
	switch(code.toLowerCase()) {
		case "es":
			return "ESP";
	}
	
	return code;
}

loadHeatMap('agriculture', 2012);

// Topic select

var selectedTopic = 'agriculture';

document.getElementById('topic-select').onchange = function() {
	var region = this.options[this.selectedIndex].value;
	
	selectedTopic = region;
	
	showChartsByTopic(region);
	loadHeatMap(region, selectedYear);
	
	document.getElementById('indicator-select').options[0].innerHTML = this.selectedIndex == 0 ? 'Employment in Agriculture' : 'Land pollution';
	document.getElementById('all-indicator-select').options[0].innerHTML = this.selectedIndex == 0 ? 'Employment in Agriculture' : 'Land pollution';
	
	var h2s = document.querySelectorAll('.graph-section h2.section span');
	
	for (var i = 0; i < h2s.length; i++)
		h2s[i].innerHTML = this.selectedIndex == 0 ? 'Employment in Agriculture for countries in the region' : 'Land pollution for countries in the region';
}

// Map timeline

var selectedYear = 2012;

var years = document.querySelectorAll('.timeline .line .year a');

for (var i = 0; i < years.length; i++) {
	years[i].onclick = function() {
		for (var j = 0; j < years.length; j++)
			years[j].parentNode.className = "year";
			
		this.parentNode.className = "year selected";
		
		loadHeatMap(selectedTopic, this.title);
		
		return false;	
	}
}
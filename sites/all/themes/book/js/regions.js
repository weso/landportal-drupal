function cloneObject(obj) {
	var o = {};
	
	for (var property in obj)
		o[property] = obj[property];
		
	return o;
}

// Charts

function showChartsByRegion(region) {
	var charts = document.querySelectorAll('.region-chart');
	
	for (var i = 0; i < charts.length; i++)
		charts[i].style.display = 'none';

	for (var element in chartOptions) {
	    var options = cloneObject(chartOptions[element]);
	
	    options.container += ' div.region-' + region;
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

showChartsByRegion('global');
document.getElementById('region-select').selectedIndex = 0;

// Map

function loadHeatMap(region, year) {
	var countryData = {};
	
	var countries = document.querySelectorAll('.heat-map.region-' + region + '.year-' + year + ' tbody tr');
	
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
			}
		  });
	}
	
	window.onresize = loadMap;
	
	loadMap();
}

loadHeatMap('global', 2012);

// Region select

var selectedRegion = 'global';

document.getElementById('region-select').onchange = function() {
	var region = this.options[this.selectedIndex].value;
	
	selectedRegion = region;
	
	showChartsByRegion(region);
	loadHeatMap(region, selectedYear);
}

// Map timeline

var selectedYear = 2012;

var years = document.querySelectorAll('.timeline .line .year a');

for (var i = 0; i < years.length; i++) {
	years[i].onclick = function() {
		for (var j = 0; j < years.length; j++)
			years[j].parentNode.className = "year";
			
		this.parentNode.className = "year selected";
		
		loadHeatMap(selectedRegion, this.title);
		
		return false;	
	}
}

// Source select

var sourceSelect = document.getElementById('source-select');
sourceSelect.selectedIndex = 0;

sourceSelect.onchange = function() {
	var source = this.options[this.selectedIndex].value;
	
	var indicatorSelect = document.getElementById('indicator-select');
	
	var title = 'Employment in Agriculture';
	
	if (this.selectedIndex == 0) {
		indicatorSelect.options[0].innerHTML = title = 'Employment in Agriculture';
	}
	else {
		indicatorSelect.options[0].innerHTML = title = 'Employment in Social Institutions';
		
	}
	
	var titles = document.querySelectorAll('.graph-section h2.section span');
	
	for (var i = 0; i < titles.length; i++) {
		titles[i].innerHTML = title + ' FOR COUNTRIES IN THE REGION';
	}
}
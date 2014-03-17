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
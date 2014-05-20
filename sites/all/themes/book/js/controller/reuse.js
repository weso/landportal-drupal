/*
PR.prettyPrint();

document.getElementById('run-query').onsubmit = function() {
	var sqarql = document.getElementById('sparql-url').value;
	var result = document.getElementById('query-result');
	var resultHTML = document.getElementById('query-result-html');
	var format = document.getElementById('format').value;

	switch(format) {
	case 'text/html':
			format = 'html';
			break;
	case 'application/vnd.ms-excel':
			format = 'html';
			break;
	case 'application/sparql-results+xml':
			format = 'xml';
			break;
	case 'json':
			format = 'js';
			break;
	case 'application/javascript':
			format = 'js';
			break;
	case 'text/plain':
			format = 'xml';
			break;
	case 'application/rdf+xml':
			format = 'xml';
			break;
	default:
			format = 'html';
			break;
	}

	var queryString = "";
	var queryStringHTML = "";

	for (var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];

		if (element.tagName.toLowerCase() == 'button')
			continue;

		var name = element.name;
		var value = element.value;

		if (queryString != '')
			queryString += '&';

		queryString += name + '=' + value;

		if (queryStringHTML != '')
			queryStringHTML += '&';

		if (name == 'format')
			value = 'text/html';

		queryStringHTML += name + '=' + value;
	}

	ajax.load({
		url: sqarql,
		parameters: queryString,
		callback: function(data) {
			var pre = document.createElement('pre');
			pre.className= "prettyprint lang-" + format;
			pre.textContent = data;

			result.innerHTML = '';
			result.appendChild(pre);
			PR.prettyPrint();
		}
	});

	ajax.load({
		url: sqarql,
		parameters: queryStringHTML,
		callback: function(data) {
			resultHTML.innerHTML = data;

			var table = document.querySelector('#query-result-html table');

			if (table) {
				table.className = 'table table-striped';
				table.border = 0;
			}
		}
	});

	return false;
}
*/

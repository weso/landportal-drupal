var languages = ['en', 'es', 'fr'];
var navigation = ['index', 'regions', 'countries', 'indicators', 'catalog', 'sources', 'widgets', 'data'];

(function loadPartials() {
	var partials = document.querySelectorAll('script[type=mustache-partial]');

	var partialContent = new Object();

	var count = partials.length;

	for (var i = 0; i < partials.length; i++)
		loadFile(partials[i].src, function(file, request) {
			count--;

			var name = file.substring(file.lastIndexOf('/') + 1);
			name = name.substring(0, name.indexOf('.'));

			partialContent[name] = request.responseText;

			if (count <= 0)
				loadInternationalization(loadParams(), partialContent)
		});
})();

function loadParams() {
	var result = {};

	if (window.location.hash && window.location.hash.length > 0) {
		var params = window.location.hash.substring(1);
		params = params.split('?')
		params = params[0].split('&');

		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split('=');

			if (pair.length != 2)
				continue;

			result[pair[0]] = pair[1];
		}
	}

	return result;
}

function loadInternationalization(params, partials) {
	var language = 'en';

	if (params.language && languages.indexOf(params.language) != -1)
		language = params.language;

	var lang = document.querySelector('script[type=lang][lang=' + language + ']');

	loadFile(lang.src, function(file, request) {
		var labels = JSON.parse(request.responseText);

		loadTemplate(params, partials, labels, language);
	});
}

function loadTemplate(params, partials, labels, language) {
	if (params.view) {
		loadFile('js/model/' + params.view + '.json', function(file, request) {

			var data = request.responseText ? JSON.parse(request.responseText) : {};
			data.labels = labels;

            data.path = "."

            data.scripts = [
                {
                    "script": "js/controller/" + params.view + ".js"
                }
            ];

            data.application = {
            	"language": language,
            	"api": "http://localhost/land-portal-prototype/api/ajax",
							"api-widgets": "http://156.35.82.103/api",
							"sparql-url": "http://156.35.82.103:1300/sparql",
	            "languages": [],
	            "user": {
	            	"name": "Juan Castro"
	            },
	            "navigation": {}
            }

            data.application.navigation[params.navigation] = params.navigation;

            data['entity-id'] = params.id;

            // Languages

            for (var i = 0; i < languages.length; i++) {
	            var lang = {
	            	"code": languages[i],
	            	"language": labels[languages[i]] ? labels[languages[i]] : languages[i]
	            };

	            if (languages[i] == language)
	            	lang.selected = "true";

	            data.application.languages.push(lang);
            }

			loadFile('views/' + params.view + '.mustache', function(file, request) {
				document.body.innerHTML = Mustache.render(request.responseText, data, partials);

				loadScript('js/controller/' + params.view + '.js', function() {});
			});
		});
	}
}

function loadFile(file, callback) {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function()
	{
		if (request.readyState == 4)
		{
			callback(file, request);
		}
	}

	try {
		request.open("GET", file + '?' + new Date().getTime(), true);
		request.send();
	}
	catch(e) {
		console.log('loadFile error: ' + e);
	}
}

function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url + '?' + new Date().getTime();
    document.getElementsByTagName("head")[0].appendChild(script);
}

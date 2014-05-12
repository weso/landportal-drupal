var ajax = new (function() {
	var http = false;

	if (window.XMLHttpRequest)
		http = new XMLHttpRequest();
	else if (window.ActiveXObject)
		http = new ActiveXObject('Microsoft.XMLHTTP');

	// Cache

	var cache = {};

	// Load

	this.load = function(settings)
	{
		var url = settings.url;

		if (!url)
			return;

		var method = settings.method ? settings.method.toUpperCase() : 'GET';
		var parameters = settings.parameters ? settings.parameters : '';
		var callback = settings.callback;
		var content_type = settings.content_type ? settings.content_type : false;

		if (method == 'GET')
			url += '?' + parameters;

		if (cache[url]) {
			callback.call(null, cache[url]);
		}
		else if(http)
		{
			http.open(method, url, true);

			if (method != 'GET' && content_type != false)
			{
				// Header is sent with the request
				http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}

			http.send(method == 'GET' ? null : parameters);

			http.onreadystatechange = function()
			{
				if(http.readyState == 4 && callback != null && callback != undefined) {
					cache[url] = http.responseText;

					callback.call(null, http.responseText);
				}
			};
		}
	}

	// Get observations

	var loading = null;
	var api = null;
	var language = null;

	function loadInfo() {
		if (!loading)
			loading = document.querySelector('img.loading');

		if (!api)
			api = document.getElementById('api-url').value;

		if (!language)
			language = document.getElementById('selected-language').value;
	}

	var obsData = { };

	this.getObservations = function() {
		return obsData.length > 0 ? obsData[0] : null;
	}

	var observationsCallback = null;

	this.loadObservations = function(region, indicator, callback) {
		loadInfo();

		if (!api)
			return;

		if (loading)
			loading.style.display = 'inline';

		observationsCallback = callback;

		ajax.load({
			url: api + '/observations/' + region + '/' + indicator,
			parameters: 'lang=' + language,
			callback: loadObservationsCallback
		});
	}

	function loadObservationsCallback(data) {
		var data = processData(data);
		obsData = data;

		data = data.length > 0 ? data[0] : [];

		if (observationsCallback)
			observationsCallback.call(null, data);

		// Hide loading
		if (loading)
			loading.style.display = 'none';
	}

	function processData(data) {
		data = JSON.parse(data);

		var obsData = {};

		var indicators = [];

		for (var i = 0; i < data.length; i++) {
			var countryCode = data[i].country.iso3;
			var countryName = data[i].country.name;

			var indicator = data[i].indicator.id;

			if (!obsData[indicator]) {
				obsData[indicator] = {
					observations: {},
					times: [],
					indicator: data[i].indicator
				};

				indicators.push(indicator);
			}

			var lastUpdate = data[i].indicator['last_update'];

			var time = data[i]['ref_time'].value;

			var value = data[i].value ? data[i].value.value : null;

			if (!value)
				continue;

			if (obsData[indicator].times.indexOf(time) == -1)
				obsData[indicator].times.push(time);

			if (!obsData[indicator].observations[time])
				obsData[indicator].observations[time] = [];

			obsData[indicator].observations[time].push({
				name: countryName,
				code: countryCode,
				value: value,
				lastUpdate: lastUpdate
			});
		}

		var retData = [];

		for (var i = 0; i < indicators.length; i++) {
			var indicator = indicators[i];
			obsData[indicator].times.sort();

			retData.push(obsData[indicator]);
		}

		return retData;
	}

	// Get Observation average

	this.loadObservationsAverage = function(region, indicator, callback) {
		loadInfo();

		if (!api)
			return;

		ajax.load({
			url: api + '/observations/' + region + '/' + indicator + '/average',
			parameters: 'lang=' + language,
			callback: callback
		});
	}
	this.loadObservationsByCountryAndIndicator = function(country, indicator, callback) {
		loadObservationsBy(country, indicator, callback);
	}

	this.loadObservationsByCountry = function(country, callback) {
		loadObservationsBy(country, 'starred', callback);
	}

	function loadObservationsBy(country, indicator, callback) {
		loadInfo();

		if (!api)
			return;

		ajax.load({
			url: api + '/observations/' + country + '/' + indicator,
			parameters: 'lang=' + language,
			callback: function(data) {
				data = JSON.parse(data);

				var obs = {};
				var indicators = [];

				for (var i = 0; i < data.length; i++) {
					var time = data[i].ref_time.value;
					var value = parseFloat(data[i].value.value);
					var indicator = data[i].indicator.id;

					if (!obs[indicator]) {
						obs[indicator] = {
							indicator: indicator,
							values: []
						};
						indicators.push(indicator);
					}

					obs[indicator].values.push({
						time: time,
						average: value
					});
				}

				var ret = [];

				for (var i = 0; i < indicators.length; i++) {
					var indicator = indicators[i];

					ret.push(obs[indicator]);
				}

				if (callback)
					callback.call(null, ret);
				}
		});
	}
})();

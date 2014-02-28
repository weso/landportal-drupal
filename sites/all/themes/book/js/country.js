function load(data) {
	for (var element in chartOptions) {
		var options = chartOptions[element];
	
		if (!data.charts[element])
			continue;
	
		// Set chart series
		options.series = data.charts[element].series;
	
		if (!options['xAxis'])
			options['xAxis'] = new Object();
		
		if (data.charts[element].values)
			options['xAxis'].values = data.charts[element].values;
		
		var container = options.container;
		
		if (!container)
			continue;
		
		container = document.querySelector(container);
	
		if (!container)
			continue;
	
		options.width = container.offsetWidth;
		options.height = container.offsetHeight;
	
		wesCountry.charts.chart(options);	
	}
}
var countryList = [
	{ "iso3": "ABW", "name": "Aruba", "iso2": "AW" },
	{ "iso3": "AFG", "name": "Afghanistan", "iso2": "AF" },
	{ "iso3": "AGO", "name": "Angola", "iso2": "AO" },
	{ "iso3": "AIA", "name": "Anguilla", "iso2": "AI" },
	{ "iso3": "ALB", "name": "Albania", "iso2": "AL" },
	{ "iso3": "AND", "name": "Andorra", "iso2": "AD" },
	{ "iso3": "ARE", "name": "United Arab Emirates", "iso2": "AE" },
	{ "iso3": "ARG", "name": "Argentina", "iso2": "AR" },
	{ "iso3": "ARM", "name": "Armenia", "iso2": "AM" },
	{ "iso3": "ASM", "name": "American Samoa", "iso2": "AS" },
	{ "iso3": "ATA", "name": "Antarctica", "iso2": "AQ" },
	{ "iso3": "ATG", "name": "Antigua and Barbuda", "iso2": "AG" },
	{ "iso3": "AUS", "name": "Australia", "iso2": "AU" },
	{ "iso3": "AUT", "name": "Austria", "iso2": "AT" },
	{ "iso3": "AZE", "name": "Azerbaijan", "iso2": "AZ" },
	{ "iso3": "BDI", "name": "Burundi", "iso2": "BI" },
	{ "iso3": "BEL", "name": "Belgium", "iso2": "BE" },
	{ "iso3": "BEN", "name": "Benin", "iso2": "BJ" },
	{ "iso3": "BFA", "name": "Burkina Faso", "iso2": "BF" },
	{ "iso3": "BGD", "name": "Bangladesh", "iso2": "BD" },
	{ "iso3": "BGR", "name": "Bulgaria", "iso2": "BG" },
	{ "iso3": "BHR", "name": "Bahrain", "iso2": "BH" },
	{ "iso3": "BHS", "name": "Bahamas", "iso2": "BS" },
	{ "iso3": "BIH", "name": "Bosnia and Herzegovina", "iso2": "BA" },
	{ "iso3": "BLR", "name": "Belarus", "iso2": "BY" },
	{ "iso3": "BLZ", "name": "Belize", "iso2": "BZ" },
	{ "iso3": "BMU", "name": "Bermuda", "iso2": "BM" },
	{ "iso3": "BOL", "name": "Bolivia", "iso2": "BO" },
	{ "iso3": "BRA", "name": "Brazil", "iso2": "BR" },
	{ "iso3": "BRB", "name": "Barbados", "iso2": "BB" },
	{ "iso3": "BRN", "name": "Brunei Darussalam", "iso2": "BN" },
	{ "iso3": "BTN", "name": "Bhutan", "iso2": "BT" },
	{ "iso3": "BWA", "name": "Botswana", "iso2": "BW" },
	{ "iso3": "CAF", "name": "Central African Republic", "iso2": "CF" },
	{ "iso3": "CAN", "name": "Canada", "iso2": "CA" },
	{ "iso3": "CHE", "name": "Switzerland", "iso2": "CH" },
	{ "iso3": "CHL", "name": "Chile", "iso2": "CL" },
	{ "iso3": "CHN", "name": "China", "iso2": "CN" },
	{ "iso3": "CIV", "name": "Côte d'Ivoire", "iso2": "CI" },
	{ "iso3": "CMR", "name": "Cameroon", "iso2": "CM" },
	{ "iso3": "COD", "name": "Democratic Republic of the Congo", "iso2": "CD" },
	{ "iso3": "COG", "name": "Congo", "iso2": "CG" },
	{ "iso3": "COK", "name": "Cook Islands", "iso2": "CK" },
	{ "iso3": "COL", "name": "Colombia", "iso2": "CO" },
	{ "iso3": "COM", "name": "Comoros", "iso2": "KM" },
	{ "iso3": "CPV", "name": "Cape Verde", "iso2": "CV" },
	{ "iso3": "CRI", "name": "Costa Rica", "iso2": "CR" },
	{ "iso3": "CUB", "name": "Cuba", "iso2": "CU" },
	{ "iso3": "CYM", "name": "Cayman Islands", "iso2": "KY" },
	{ "iso3": "CYP", "name": "Cyprus", "iso2": "CY" },
	{ "iso3": "CZE", "name": "Czech Republic", "iso2": "CZ" },
	{ "iso3": "DEU", "name": "Germany", "iso2": "DE" },
	{ "iso3": "DJI", "name": "Djibouti", "iso2": "DJ" },
	{ "iso3": "DMA", "name": "Dominica", "iso2": "DM" },
	{ "iso3": "DNK", "name": "Denmark", "iso2": "DK" },
	{ "iso3": "DOM", "name": "Dominican Republic", "iso2": "DO" },
	{ "iso3": "DZA", "name": "Algeria", "iso2": "DZ" },
	{ "iso3": "ECU", "name": "Ecuador", "iso2": "EC" },
	{ "iso3": "EGY", "name": "Egypt", "iso2": "EG" },
	{ "iso3": "ERI", "name": "Eritrea", "iso2": "ER" },
	{ "iso3": "ESP", "name": "Spain", "iso2": "ES" },
	{ "iso3": "EST", "name": "Estonia", "iso2": "EE" },
	{ "iso3": "ETH", "name": "Ethiopia", "iso2": "ET" },
	{ "iso3": "FIN", "name": "Finland", "iso2": "FI" },
	{ "iso3": "FJI", "name": "Fiji", "iso2": "FJ" },
	{ "iso3": "FLK", "name": "Falkland Islands", "iso2": "FK" },
	{ "iso3": "FRA", "name": "France", "iso2": "FR" },
	{ "iso3": "FRO", "name": "Faroe Islands", "iso2": "FO" },
	{ "iso3": "FSM", "name": "Micronesia", "iso2": "FM" },
	{ "iso3": "GAB", "name": "Gabon", "iso2": "GA" },
	{ "iso3": "GBR", "name": "United Kingdom", "iso2": "GB" },
	{ "iso3": "GEO", "name": "Georgia", "iso2": "GE" },
	{ "iso3": "GHA", "name": "Ghana", "iso2": "GH" },
	{ "iso3": "GIN", "name": "Guinea", "iso2": "GN" },
	{ "iso3": "GMB", "name": "Gambia", "iso2": "GM" },
	{ "iso3": "GNB", "name": "Guinea-Bissau", "iso2": "GW" },
	{ "iso3": "GNQ", "name": "Equatorial Guinea", "iso2": "GQ" },
	{ "iso3": "GRC", "name": "Greece", "iso2": "GR" },
	{ "iso3": "GRD", "name": "Grenada", "iso2": "GD" },
	{ "iso3": "GTM", "name": "Guatemala", "iso2": "GT" },
	{ "iso3": "GUM", "name": "Guam", "iso2": "GU" },
	{ "iso3": "GUY", "name": "Guyana", "iso2": "GY" },
	{ "iso3": "HND", "name": "Honduras", "iso2": "HN" },
	{ "iso3": "HRV", "name": "Croatia", "iso2": "HR" },
	{ "iso3": "HTI", "name": "Haiti", "iso2": "HT" },
	{ "iso3": "HUN", "name": "Hungary", "iso2": "HU" },
	{ "iso3": "IDN", "name": "Indonesia", "iso2": "ID" },
	{ "iso3": "IND", "name": "India", "iso2": "IN" },
	{ "iso3": "IRL", "name": "Ireland", "iso2": "IE" },
	{ "iso3": "IRN", "name": "Iran", "iso2": "IR" },
	{ "iso3": "IRQ", "name": "Iraq", "iso2": "IQ" },
	{ "iso3": "ISL", "name": "Iceland", "iso2": "IS" },
	{ "iso3": "ISR", "name": "Israel", "iso2": "IL" },
	{ "iso3": "ITA", "name": "Italy", "iso2": "IT" },
	{ "iso3": "JAM", "name": "Jamaica", "iso2": "JM" },
	{ "iso3": "JOR", "name": "Jordan", "iso2": "JO" },
	{ "iso3": "JPN", "name": "Japan", "iso2": "JP" },
	{ "iso3": "KAZ", "name": "Kazakhstan", "iso2": "KZ" },
	{ "iso3": "KEN", "name": "Kenya", "iso2": "KE" },
	{ "iso3": "KGZ", "name": "Kyrgyzstan", "iso2": "KG" },
	{ "iso3": "KHM", "name": "Cambodia", "iso2": "KH" },
	{ "iso3": "KIR", "name": "Kiribati", "iso2": "KI" },
	{ "iso3": "KNA", "name": "Saint Kitts and Nevis", "iso2": "KN" },
	{ "iso3": "KOR", "name": "Republic of Korea", "iso2": "KR" },
	{ "iso3": "KWT", "name": "Kuwait", "iso2": "KW" },
	{ "iso3": "LAO", "name": "Lao", "iso2": "LA" },
	{ "iso3": "LBN", "name": "Lebanon", "iso2": "LB" },
	{ "iso3": "LBR", "name": "Liberia", "iso2": "LR" },
	{ "iso3": "LBY", "name": "Libya", "iso2": "LY" },
	{ "iso3": "LCA", "name": "Saint Lucia", "iso2": "LC" },
	{ "iso3": "LIE", "name": "Liechtenstein", "iso2": "LI" },
	{ "iso3": "LKA", "name": "Sri Lanka", "iso2": "LK" },
	{ "iso3": "LSO", "name": "Lesotho", "iso2": "LS" },
	{ "iso3": "LTU", "name": "Lithuania", "iso2": "LT" },
	{ "iso3": "LUX", "name": "Luxembourg", "iso2": "LU" },
	{ "iso3": "LVA", "name": "Latvia", "iso2": "LV" },
	{ "iso3": "MAR", "name": "Morocco", "iso2": "MA" },
	{ "iso3": "MCO", "name": "Monaco", "iso2": "MC" },
	{ "iso3": "MDA", "name": "Moldova", "iso2": "MD" },
	{ "iso3": "MDG", "name": "Madagascar", "iso2": "MG" },
	{ "iso3": "MDV", "name": "Maldives", "iso2": "MV" },
	{ "iso3": "MEX", "name": "Mexico", "iso2": "MX" },
	{ "iso3": "MHL", "name": "Marshall Islands", "iso2": "MH" },
	{ "iso3": "MKD", "name": "Macedonia", "iso2": "MK" },
	{ "iso3": "MLI", "name": "Mali", "iso2": "ML" },
	{ "iso3": "MLT", "name": "Malta", "iso2": "MT" },
	{ "iso3": "MMR", "name": "Myanmar", "iso2": "MM" },
	{ "iso3": "MNE", "name": "Montenegro", "iso2": "ME" },
	{ "iso3": "MNG", "name": "Mongolia", "iso2": "MN" },
	{ "iso3": "MOZ", "name": "Mozambique", "iso2": "MZ" },
	{ "iso3": "MRT", "name": "Mauritania", "iso2": "MR" },
	{ "iso3": "MSR", "name": "Montserrat", "iso2": "MS" },
	{ "iso3": "MUS", "name": "Mauritius", "iso2": "MU" },
	{ "iso3": "MWI", "name": "Malawi", "iso2": "MW" },
	{ "iso3": "MYS", "name": "Malaysia", "iso2": "MY" },
	{ "iso3": "NAM", "name": "Namibia", "iso2": "NA" },
	{ "iso3": "NCL", "name": "New Caledonia", "iso2": "NC" },
	{ "iso3": "NER", "name": "Niger", "iso2": "NE" },
	{ "iso3": "NGA", "name": "Nigeria", "iso2": "NG" },
	{ "iso3": "NIC", "name": "Nicaragua", "iso2": "NI" },
	{ "iso3": "NIU", "name": "Niue", "iso2": "NU" },
	{ "iso3": "NLD", "name": "Netherlands", "iso2": "NL" },
	{ "iso3": "NOR", "name": "Norway", "iso2": "NO" },
	{ "iso3": "NPL", "name": "Nepal", "iso2": "NP" },
	{ "iso3": "NRU", "name": "Nauru", "iso2": "NR" },
	{ "iso3": "NZL", "name": "New Zealand", "iso2": "NZ" },
	{ "iso3": "OMN", "name": "Oman", "iso2": "OM" },
	{ "iso3": "PAK", "name": "Pakistan", "iso2": "PK" },
	{ "iso3": "PAN", "name": "Panama", "iso2": "PA" },
	{ "iso3": "PER", "name": "Peru", "iso2": "PE" },
	{ "iso3": "PHL", "name": "Philippines", "iso2": "PH" },
	{ "iso3": "PLW", "name": "Palau", "iso2": "PW" },
	{ "iso3": "PNG", "name": "Papua New Guinea", "iso2": "PG" },
	{ "iso3": "POL", "name": "Poland", "iso2": "PL" },
	{ "iso3": "PRI", "name": "Puerto Rico", "iso2": "PR" },
	{ "iso3": "PRK", "name": "Korea", "iso2": "KP" },
	{ "iso3": "PRT", "name": "Portugal", "iso2": "PT" },
	{ "iso3": "PRY", "name": "Paraguay", "iso2": "PY" },
	{ "iso3": "PYF", "name": "French Polynesia", "iso2": "PF" },
	{ "iso3": "QAT", "name": "Qatar", "iso2": "QA" },
	{ "iso3": "ROU", "name": "Réunion", "iso2": "RO" },
	{ "iso3": "RUS", "name": "Russia", "iso2": "RU" },
	{ "iso3": "RWA", "name": "Rwanda", "iso2": "RW" },
	{ "iso3": "SAU", "name": "Saudi Arabia", "iso2": "SA" },
	{ "iso3": "SDN", "name": "Sudan", "iso2": "SD" },
	{ "iso3": "SEN", "name": "Senegal", "iso2": "SN" },
	{ "iso3": "SGP", "name": "Singapore", "iso2": "SG" },
	{ "iso3": "SHN", "name": "Saint Helena, Ascension and Tristan da Cunha", "iso2": "SH" },
	{ "iso3": "SLB", "name": "Solomon Islands", "iso2": "SB" },
	{ "iso3": "SLE", "name": "Sierra Leone", "iso2": "SL" },
	{ "iso3": "SLV", "name": "El Salvador", "iso2": "SV" },
	{ "iso3": "SMR", "name": "San Marino", "iso2": "SM" },
	{ "iso3": "SOM", "name": "Somalia", "iso2": "SO" },
	{ "iso3": "SPM", "name": "Saint Pierre and Miquelon", "iso2": "PM" },
	{ "iso3": "SRB", "name": "Serbia", "iso2": "RS" },
	{ "iso3": "STP", "name": "Sao Tome and Principe", "iso2": "ST" },
	{ "iso3": "SUR", "name": "Suriname", "iso2": "SR" },
	{ "iso3": "SVK", "name": "Slovakia", "iso2": "SK" },
	{ "iso3": "SVN", "name": "Slovenia", "iso2": "SI" },
	{ "iso3": "SWE", "name": "Sweden", "iso2": "SE" },
	{ "iso3": "SWZ", "name": "Swaziland", "iso2": "SZ" },
	{ "iso3": "SYC", "name": "Seychelles", "iso2": "SC" },
	{ "iso3": "SYR", "name": "Syrian Arab Republic", "iso2": "SY" },
	{ "iso3": "TCA", "name": "Turks and Caicos Islands", "iso2": "TC" },
	{ "iso3": "TCD", "name": "Chad", "iso2": "TD" },
	{ "iso3": "TGO", "name": "Togo", "iso2": "TG" },
	{ "iso3": "THA", "name": "Thailand", "iso2": "TH" },
	{ "iso3": "TJK", "name": "Tajikistan", "iso2": "TJ" },
	{ "iso3": "TKL", "name": "Tokelau", "iso2": "" },
	{ "iso3": "TKM", "name": "Turkmenistan", "iso2": "TM" },
	{ "iso3": "TLS", "name": "Timor-Leste", "iso2": "TL" },
	{ "iso3": "TON", "name": "Tonga", "iso2": "TO" },
	{ "iso3": "TTO", "name": "Trinidad and Tobago", "iso2": "TT" },
	{ "iso3": "TUN", "name": "Tunisia", "iso2": "TN" },
	{ "iso3": "TUR", "name": "Turkey", "iso2": "TR" },
	{ "iso3": "TUV", "name": "Tuvalu", "iso2": "TW" },
	{ "iso3": "TZA", "name": "United Republic of Tanzania", "iso2": "TZ" },
	{ "iso3": "UGA", "name": "Uganda", "iso2": "UG" },
	{ "iso3": "UKR", "name": "Ukraine", "iso2": "UA" },
	{ "iso3": "URY", "name": "Uruguay", "iso2": "UY" },
	{ "iso3": "USA", "name": "United States of America", "iso2": "US" },
	{ "iso3": "UZB", "name": "Uzbekistan", "iso2": "UZ" },
	{ "iso3": "VAT", "name": "Holy See", "iso2": "VA" },
	{ "iso3": "VCT", "name": "Saint Vincent and the Grenadines", "iso2": "VC" },
	{ "iso3": "VEN", "name": "Venezuela", "iso2": "VE" },
	{ "iso3": "VGB", "name": "British Virgin Islands", "iso2": "VG" },
	{ "iso3": "VNM", "name": "Viet Nam", "iso2": "VN" },
	{ "iso3": "VUT", "name": "Vanuatu", "iso2": "VU" },
	{ "iso3": "WLF", "name": "Wallis and Futuna Islands", "iso2": "WF" },
	{ "iso3": "WSM", "name": "Samoa", "iso2": "WS" },
	{ "iso3": "YEM", "name": "Yemen", "iso2": "YE" },
	{ "iso3": "ZAF", "name": "South Africa", "iso2": "ZA" },
	{ "iso3": "ZMB", "name": "Zambia", "iso2": "ZM" },
	{ "iso3": "ZWE", "name": "Zimbabwe", "iso2": "ZW" }
];

function cloneObject(obj) {
	var o = {};
	
	for (var property in obj)
		o[property] = obj[property];
		
	return o;
}

var selectedYear = 2012;
var selectedIndicator = '';

// Charts

function updateCharts(selectedIndicator, selectedYear) {
	updateTimelineChart(selectedIndicator, selectedYear);
	updateCorrelationChart(selectedIndicator, selectedYear);
	updateCountryTable(selectedIndicator, selectedYear);
}

// Timeline

function updateTimelineChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-timeline-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var compareIndicator = document.getElementById('chart-timeline-comparison-indicator');
	compareIndicator = compareIndicator.options[compareIndicator.selectedIndex].value;
	
	options.series = [{
		'name': selectedIndicator,
		'values': []
	}, {
		'name': compareIndicator,
		'values': []
	}];
	
	if (!options.xAxis)
		options.xAxis = {};
		
	options.xAxis.values = [];
	
	for (var i = 2008; i <= 2012; i++) {
		Math.seedrandom(selectedIndicator + i);
		options.series[0].values.push(random(1, 200));
		Math.seedrandom(compareIndicator + i);
		options.series[1].values.push(random(1, 200));
		
		options.xAxis.values.push(i);
	}
	
	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.lineChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

document.getElementById('topic-select').selectedIndex = 0;

// Correlation

function updateCorrelationChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-correlation-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var compareIndicator = document.getElementById('chart-correlate-comparison-indicator');
	compareIndicator = compareIndicator.options[compareIndicator.selectedIndex].value;
	
	options.series = [{
		'name': selectedIndicator,
		'values': []
	}, {
		'name': compareIndicator,
		'values': []
	}];
	
	if (!options.xAxis)
		options.xAxis = {};
		
	options.xAxis.values = [];
	
	for (var i = 0; i < countryList.length; i++) {
		var code = countryList[i].iso3;
	
		Math.seedrandom(code + selectedIndicator + selectedYear);
		options.series[0].values.push([50 + i, random(50, 250)]);
		Math.seedrandom(code + compareIndicator + selectedYear);
		options.series[1].values.push([50 + i, random(50, 250)]);
		
		options.xAxis.values.push(i);
	}	
	
	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.scatterPlot(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

// Country table

function updateCountryTable(selectedIndicator, selectedYear) {
	var tbody = document.querySelector('#country-values tbody');
	
	if (!tbody)
		return;
		
	tbody.innerHTML = '';	
		
	var path = document.getElementById('path').value;

	for (var i = 0; i < countryList.length; i++) {
		var iso3 = countryList[i].iso3;
		var iso2 = countryList[i].iso2;
		var name = countryList[i].name;
		
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		
		var td = document.createElement('td');
		tr.appendChild(td);
		
		var flag = document.createElement('img');
		flag.src = path + '/static/images/flags/' + iso2.toUpperCase() + ".png";
		flag.className = "flag";
		flag.onerror = function() {
			this.src = path + '/static/images/flags/no-flag.png'
		}
		
		td.appendChild(flag);
		td.appendChild(document.createTextNode(name));
		
		Math.seedrandom(iso3 + selectedIndicator + selectedYear);
		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = random(50, 250).toFixed(2);
		td.className = "text-right";
		
		var td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = "2013";
		td.className = "text-center";
		
		var td = document.createElement('td');
		tr.appendChild(td);
		td.className = "text-center";
		
		Math.seedrandom(selectedIndicator + iso3 + selectedYear);
		var tendency = Math.round(random(1, 3));
		
		switch(tendency) {
			case 1:
				tendency = '<i class="fa fa-bars fa-lg"></i>';
				break;
			case 2:
				tendency = '<i class="fa fa-arrow-down fa-lg text-danger"></i>';
				break;
			default:
				tendency = '<i class="fa fa-arrow-up fa-lg text-success"></i>';
				break;
		}
		
		td.innerHTML = tendency;
	}
}

// Map

function convertCode(code) {
	switch(code.toLowerCase()) {
		case "es":
			return "ESP";
		case "pt":
			return "PRT";
		case "fr":
			return "FRA";
		case "ru":
			return "RUS";
		case "jp":
			return "JPN";
	}
	
	return code;
}

// Topic select

document.getElementById('topic-select').onchange = function() {
	var region = this.options[this.selectedIndex].value;
	
	var indicatorSelectors = document.querySelectorAll('select.topic-indicator-select');
	
	for (var i = 0; i < indicatorSelectors.length; i++)
		indicatorSelectors[i].style.display = 'none';
	
	var indicatorSelect = document.querySelector('select.topic-indicator-select:nth-of-type(' + (this.selectedIndex + 1) + ')');
	
	if (indicatorSelect) {
		indicatorSelect.style.display = 'block';
		indicatorSelect.selectedIndex = 0;
		indicatorSelect.onchange();
	}
}

// All indicator select

var allIndicators = document.getElementById('all-indicator-select');
allIndicators.onchange = changeIndicator;
allIndicators.onchange();

// Indicator select

var indicatorSelectors = document.querySelectorAll('select.topic-indicator-select');

for (var i = 0; i < indicatorSelectors.length; i++)
	indicatorSelectors[i].onchange = function() {
		var value = this.options[this.selectedIndex].value;
	
		var allIndicators = document.getElementById('all-indicator-select');
		
		for (var i = 0; i < allIndicators.options.length; i++) {
			if (allIndicators.options[i].value == value) {
				allIndicators.selectedIndex = i;
				allIndicators.onchange();
				
				break;
			}
		}
	};
	
if (indicatorSelectors.length > 0) {
	indicatorSelectors[0].selectedIndex = 0;
	indicatorSelectors[0].onchange();
	
	if (indicatorSelectors[0].options.length > 0)
		selectedIndicator = indicatorSelectors[0].options[0].value;
}

function changeIndicator() {
	selectedIndicator = this.options[this.selectedIndex].value;

	updateMap(selectedIndicator, selectedYear);
	updateCharts(selectedIndicator, selectedYear);
	
	var texts = document.querySelectorAll('span.indicator-name');
	
	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;
}

// Comparison indicator select

var timelineComparisonIndicator = document.getElementById('chart-timeline-comparison-indicator');

timelineComparisonIndicator.onchange = function() {
	updateTimelineChart(selectedIndicator, selectedYear);
}

timelineComparisonIndicator.selectedIndex = 1;
timelineComparisonIndicator.onchange();

// Correlate indicator select

var correlateComparisonIndicator = document.getElementById('chart-correlate-comparison-indicator');

correlateComparisonIndicator.onchange = function() {
	updateCorrelationChart(selectedIndicator, selectedYear);
}

correlateComparisonIndicator.selectedIndex = 1;
correlateComparisonIndicator.onchange();

// Map timeline

var years = document.querySelectorAll('.timeline .line .year a');

for (var i = 0; i < years.length; i++) {
	years[i].onclick = function() {
		for (var j = 0; j < years.length; j++)
			years[j].parentNode.className = "year";
			
		this.parentNode.className = "year selected";
		
		selectedYear = this.title;
		
		updateMap(selectedIndicator, selectedYear);
		
		return false;	
	}
}
	
/* Country list for map */

function updateMap(indicatorCode, selectedYear) {
	var list = {};

	for (var i = 0; i < countryList.length; i++) {
		var code = countryList[i].iso2;

		Math.seedrandom(code + indicatorCode + selectedYear);
		list[code] = random(1, 100);	
	}

	$('#mapDiv .map-container').empty().vectorMap({
    map: 'world_mill_en',
    series: {
      regions: [{
        values: list,
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
		window.location.href = '/countries/' + convertCode(code)
	}
  });
}

function random(min, max) {
	return ((Math.random() * max) + min);
}
	
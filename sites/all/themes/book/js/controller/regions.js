var continents = [
{
    "name": "Asia",
    "code": "asia",
    "countries": [
		{ "iso2": "AF", "iso3" : "AFG", "name": "Afghanistan", "data": false, "extended": false },
		{ "iso2": "AM", "iso3" : "ARM", "name": "Armenia", "data": false, "extended": false },
		{ "iso2": "AZ", "iso3" : "AZE", "name": "Azerbaijan", "data": false, "extended": false },
		{ "iso2": "BH", "iso3" : "BHR", "name": "Bahrain", "data": false, "extended": false },
		{ "iso2": "BD", "iso3" : "BGD", "name": "Bangladesh", "data": false, "extended": false },
		{ "iso2": "BT", "iso3" : "BTN", "name": "Bhutan", "data": false, "extended": false },
		{ "iso2": "BN", "iso3" : "BRN", "name": "Brunei", "data": false, "extended": false },
		{ "iso2": "KH", "iso3" : "KHM", "name": "Cambodia", "data": false, "extended": false },
		{ "iso2": "CN", "iso3" : "CHN", "name": "China", "data": false, "extended": false },
		{ "iso2": "CX", "iso3" : "CXR", "name": "Christmas Island", "data": false, "extended": false },
		{ "iso2": "CC", "iso3" : "CCK", "name": "Cocos Islands", "data": false, "extended": false },
		{ "iso2": "IO", "iso3" : "IOT", "name": "Diego Garcia", "data": false, "extended": false },
		{ "iso2": "GE", "iso3" : "GEO", "name": "Georgia", "data": false, "extended": false },
		{ "iso2": "HK", "iso3" : "HKG", "name": "Hong Kong", "data": false, "extended": false },
		{ "iso2": "IN", "iso3" : "IND", "name": "India", "data": false, "extended": false },
		{ "iso2": "ID", "iso3" : "IDN", "name": "Indonesia", "data": false, "extended": false },
		{ "iso2": "IR", "iso3" : "IRN", "name": "Iran", "data": false, "extended": false },
		{ "iso2": "IQ", "iso3" : "IRQ", "name": "Iraq", "data": false, "extended": false },
		{ "iso2": "IL", "iso3" : "ISR", "name": "Israel", "data": false, "extended": false },
		{ "iso2": "JP", "iso3" : "JPN", "name": "Japan", "data": true, "extended": false },
		{ "iso2": "JO", "iso3" : "JOR", "name": "Jordan", "data": false, "extended": false },
		{ "iso2": "KZ", "iso3" : "KAZ", "name": "Kazakhstan", "data": false, "extended": false },
		{ "iso2": "KP", "iso3" : "PRK", "name": "North Korea", "data": false, "extended": false },
		{ "iso2": "KR", "iso3" : "KOR", "name": "South Korea", "data": false, "extended": false },
		{ "iso2": "KW", "iso3" : "KWT", "name": "Kuwait", "data": false, "extended": false },
		{ "iso2": "KG", "iso3" : "KGZ", "name": "Kyrgyzstan", "data": false, "extended": false },
		{ "iso2": "LA", "iso3" : "LAO", "name": "Laos", "data": false, "extended": false },
		{ "iso2": "LB", "iso3" : "LBN", "name": "Lebanon", "data": false, "extended": false },
		{ "iso2": "MO", "iso3" : "MAC", "name": "Macau", "data": false, "extended": false },
		{ "iso2": "MY", "iso3" : "MYS", "name": "Malaysia", "data": false, "extended": false },
		{ "iso2": "MV", "iso3" : "MDV", "name": "Maldives", "data": false, "extended": false },
		{ "iso2": "MN", "iso3" : "MNG", "name": "Mongolia", "data": false, "extended": false },
		{ "iso2": "MM", "iso3" : "MMR", "name": "Myanmar", "data": false, "extended": false },
		{ "iso2": "NP", "iso3" : "NPL", "name": "Nepal", "data": false, "extended": false },
		{ "iso2": "OM", "iso3" : "OMN", "name": "Oman", "data": false, "extended": false },
		{ "iso2": "PK", "iso3" : "PAK", "name": "Pakistan", "data": false, "extended": false },
		{ "iso2": "PH", "iso3" : "PHL", "name": "Philippines", "data": false, "extended": false },
		{ "iso2": "QA", "iso3" : "QAT", "name": "Qatar", "data": false, "extended": false },
		{ "iso2": "SA", "iso3" : "SAU", "name": "Saudi Arabia", "data": false, "extended": false },
		{ "iso2": "SG", "iso3" : "SGP", "name": "Singapore", "data": false, "extended": false },
		{ "iso2": "LK", "iso3" : "LKA", "name": "Sri Lanka", "data": false, "extended": false },
		{ "iso2": "SY", "iso3" : "SYR", "name": "Syria", "data": false, "extended": false },
		{ "iso2": "TW", "iso3" : "TWN", "name": "Taiwan", "data": false, "extended": false },
		{ "iso2": "TJ", "iso3" : "TJK", "name": "Tajikistan", "data": false, "extended": false },
		{ "iso2": "TH", "iso3" : "THA", "name": "Thailand", "data": false, "extended": false },
		{ "iso2": "TR", "iso3" : "TUR", "name": "Turkey", "data": false, "extended": false },
		{ "iso2": "TM", "iso3" : "TKM", "name": "Turkmenistan", "data": false, "extended": false },
		{ "iso2": "AE", "iso3" : "ARE", "name": "United Arab Emirates", "data": false, "extended": false },
		{ "iso2": "UZ", "iso3" : "UZB", "name": "Uzbekistan", "data": false, "extended": false },
		{ "iso2": "VN", "iso3" : "VNM", "name": "Vietnam", "data": false, "extended": false },
		{ "iso2": "YE", "iso3" : "YEM", "name": "Yemen", "data": false, "extended": false },
		{ "iso2": "PS", "iso3" : "PSE", "name": "Palestine", "data": false, "extended": false }
    ]
},
{
    "name": "Africa",
    "code": "africa",
    "countries": [
		{ "iso2": "DZ", "iso3" : "DZA", "name": "Algeria", "data": false, "extended": false },
		{ "iso2": "AO", "iso3" : "AGO", "name": "Angola", "data": false, "extended": false },
		{ "iso2": "SH", "iso3" : "SHN", "name": "Ascension", "data": false, "extended": false },
		{ "iso2": "BJ", "iso3" : "BEN", "name": "Benin", "data": false, "extended": false },
		{ "iso2": "BW", "iso3" : "BWA", "name": "Botswana", "data": false, "extended": false },
		{ "iso2": "BF", "iso3" : "BFA", "name": "Burkina Faso", "data": false, "extended": false },
		{ "iso2": "BI", "iso3" : "BDI", "name": "Burundi", "data": false, "extended": false },
		{ "iso2": "CM", "iso3" : "CMR", "name": "Cameroon", "data": false, "extended": false },
		{ "iso2": "CV", "iso3" : "CPV", "name": "Cape Verde Islands", "data": false, "extended": false },
		{ "iso2": "CF", "iso3" : "CAF", "name": "Central African Republic", "data": false, "extended": false },
		{ "iso2": "TD", "iso3" : "TCD", "name": "Chad Republic", "data": false, "extended": false },
		{ "iso2": "KM", "iso3" : "COM", "name": "Comoros", "data": false, "extended": false },
		{ "iso2": "CG", "iso3" : "COG", "name": "Congo", "data": false, "extended": false },
		{ "iso2": "DJ", "iso3" : "DJI", "name": "Djibouti", "data": false, "extended": false },
		{ "iso2": "EG", "iso3" : "EGY", "name": "Egypt", "data": false, "extended": false },
		{ "iso2": "GQ", "iso3" : "GNQ", "name": "Equatorial Guinea", "data": false, "extended": false },
		{ "iso2": "ER", "iso3" : "ERI", "name": "Eritrea", "data": false, "extended": false },
		{ "iso2": "ET", "iso3" : "ETH", "name": "Ethiopia", "data": false, "extended": false },
		{ "iso2": "GA", "iso3" : "GAB", "name": "Gabon Republic", "data": false, "extended": false },
		{ "iso2": "GM", "iso3" : "GMB", "name": "Gambia", "data": false, "extended": false },
		{ "iso2": "GH", "iso3" : "GHA", "name": "Ghana", "data": false, "extended": false },
		{ "iso2": "GW", "iso3" : "GNB", "name": "Guinea-Bissau", "data": false, "extended": false },
		{ "iso2": "GN", "iso3" : "GIN", "name": "Guinea", "data": false, "extended": false },
		{ "iso2": "CI", "iso3" : "CIV", "name": "Ivory Coast", "data": false, "extended": false },
		{ "iso2": "KE", "iso3" : "KEN", "name": "Kenya", "data": false, "extended": false },
		{ "iso2": "LS", "iso3" : "LSO", "name": "Lesotho", "data": false, "extended": false },
		{ "iso2": "LR", "iso3" : "LBR", "name": "Liberia", "data": false, "extended": false },
		{ "iso2": "LY", "iso3" : "LBY", "name": "Libya", "data": false, "extended": false },
		{ "iso2": "MG", "iso3" : "MDG", "name": "Madagascar", "data": false, "extended": false },
		{ "iso2": "MW", "iso3" : "MWI", "name": "Malawi", "data": false, "extended": false },
		{ "iso2": "ML", "iso3" : "MLI", "name": "Mali Republic", "data": false, "extended": false },
		{ "iso2": "MR", "iso3" : "MRT", "name": "Mauritania", "data": false, "extended": false },
		{ "iso2": "MU", "iso3" : "MUS", "name": "Mauritius", "data": false, "extended": false },
		{ "iso2": "YT", "iso3" : "MYT", "name": "Mayotte Island", "data": false, "extended": false },
		{ "iso2": "MA", "iso3" : "MAR", "name": "Morocco", "data": false, "extended": false },
		{ "iso2": "MZ", "iso3" : "MOZ", "name": "Mozambique", "data": false, "extended": false },
		{ "iso2": "NA", "iso3" : "NAM", "name": "Namibia", "data": false, "extended": false },
		{ "iso2": "NE", "iso3" : "NER", "name": "Niger Republic", "data": false, "extended": false },
		{ "iso2": "NG", "iso3" : "NGA", "name": "Nigeria", "data": false, "extended": false },
		{ "iso2": "ST", "iso3" : "STP", "name": "Principe", "data": false, "extended": false },
		{ "iso2": "RE", "iso3" : "REU", "name": "Reunion Island", "data": false, "extended": false },
		{ "iso2": "RW", "iso3" : "RWA", "name": "Rwanda", "data": false, "extended": false },
		{ "iso2": "ST", "iso3" : "STP", "name": "Sao Tome", "data": false, "extended": false },
		{ "iso2": "SN", "iso3" : "SEN", "name": "Senegal Republic", "data": false, "extended": false },
		{ "iso2": "SC", "iso3" : "SYC", "name": "Seychelles", "data": false, "extended": false },
		{ "iso2": "SL", "iso3" : "SLE", "name": "Sierra Leone", "data": false, "extended": false },
		{ "iso2": "SO", "iso3" : "SOM", "name": "Somalia Republic", "data": false, "extended": false },
		{ "iso2": "ZA", "iso3" : "ZAF", "name": "South Africa", "data": false, "extended": false },
		{ "iso2": "SH", "iso3" : "SHN", "name": "St. Helena", "data": false, "extended": false },
		{ "iso2": "SD", "iso3" : "SDN", "name": "Sudan", "data": false, "extended": false },
		{ "iso2": "SZ", "iso3" : "SWZ", "name": "Swaziland", "data": false, "extended": false },
		{ "iso2": "TZ", "iso3" : "TZA", "name": "Tanzania", "data": false, "extended": false },
		{ "iso2": "TG", "iso3" : "TGO", "name": "Togo", "data": false, "extended": false },
		{ "iso2": "TN", "iso3" : "TUN", "name": "Tunisia", "data": false, "extended": false },
		{ "iso2": "UG", "iso3" : "UGA", "name": "Uganda", "data": false, "extended": false },
		{ "iso2": "CD", "iso3" : "COD", "name": "Zaire", "data": false, "extended": false },
		{ "iso2": "ZM", "iso3" : "ZMB", "name": "Zambia", "data": false, "extended": false },
		{ "iso2": "TZ", "iso3" : "TZA", "name": "Zanzibar", "data": false, "extended": false },
		{ "iso2": "ZW", "iso3" : "ZWE", "name": "Zimbabwe", "data": false, "extended": false },
		{ "iso2": "SS", "iso3" : "SSD", "name": "South Sudan", "data": false, "extended": false },
		{ "iso2": "CD", "iso3" : "COD", "name": "Dem. Republic of the Congo", "data": false, "extended": false }
    ]
},
{
    "name": "Americas",
    "code": "americas",
    "countries": [
		{ "iso2": "AI", "iso3" : "AIA", "name": "Anguilla", "data": false, "extended": false },
		{ "iso2": "AG", "iso3" : "ATG", "name": "Antigua and Barbuda", "data": false, "extended": false },
		{ "iso2": "AW", "iso3" : "ABW", "name": "Aruba", "data": false, "extended": false },
		{ "iso2": "BS", "iso3" : "BHS", "name": "Bahamas", "data": false, "extended": false },
		{ "iso2": "BB", "iso3" : "BRB", "name": "Barbados", "data": false, "extended": false },
		{ "iso2": "BZ", "iso3" : "BLZ", "name": "Belize", "data": false, "extended": false },
		{ "iso2": "BM", "iso3" : "BMU", "name": "Bermuda", "data": false, "extended": false },
		{ "iso2": "VG", "iso3" : "VGB", "name": "British Virgin Islands", "data": false, "extended": false },
		{ "iso2": "CA", "iso3" : "CAN", "name": "Canada", "data": false, "extended": false },
		{ "iso2": "KY", "iso3" : "CYM", "name": "Cayman Islands", "data": false, "extended": false },
		{ "iso2": "CR", "iso3" : "CRI", "name": "Costa Rica", "data": false, "extended": false },
		{ "iso2": "CU", "iso3" : "CUB", "name": "Cuba", "data": false, "extended": false },
		{ "iso2": "CW", "iso3" : "CUW", "name": "Curacao", "data": false, "extended": false },
		{ "iso2": "DM", "iso3" : "DMA", "name": "Dominica", "data": false, "extended": false },
		{ "iso2": "DO", "iso3" : "DOM", "name": "Dominican Republic", "data": false, "extended": false },
		{ "iso2": "SV", "iso3" : "SLV", "name": "El Salvador", "data": false, "extended": false },
		{ "iso2": "GL", "iso3" : "GRL", "name": "Greenland", "data": false, "extended": false },
		{ "iso2": "GD", "iso3" : "GRD", "name": "Grenada and Carriacuou", "data": false, "extended": false },
		{ "iso2": "GP", "iso3" : "GLP", "name": "Guadeloupe", "data": false, "extended": false },
		{ "iso2": "GT", "iso3" : "GTM", "name": "Guatemala", "data": false, "extended": false },
		{ "iso2": "HT", "iso3" : "HTI", "name": "Haiti", "data": false, "extended": false },
		{ "iso2": "HN", "iso3" : "HND", "name": "Honduras", "data": false, "extended": false },
		{ "iso2": "JM", "iso3" : "JAM", "name": "Jamaica", "data": false, "extended": false },
		{ "iso2": "MQ", "iso3" : "MTQ", "name": "Martinique", "data": false, "extended": false },
		{ "iso2": "MX", "iso3" : "MEX", "name": "Mexico", "data": false, "extended": false },
		{ "iso2": "PM", "iso3" : "SPM", "name": "Miquelon", "data": false, "extended": false },
		{ "iso2": "MS", "iso3" : "MSR", "name": "Montserrat", "data": false, "extended": false },
		{ "iso2": "CW", "iso3" : "ANT", "name": "Netherlands Antilles", "data": false, "extended": false },
		{ "iso2": "KN", "iso3" : "KNA", "name": "Nevis", "data": false, "extended": false },
		{ "iso2": "NI", "iso3" : "NIC", "name": "Nicaragua", "data": false, "extended": false },
		{ "iso2": "PA", "iso3" : "PAN", "name": "Panama", "data": false, "extended": false },
		{ "iso2": "PR", "iso3" : "PRI", "name": "Puerto Rico", "data": false, "extended": false },
		{ "iso2": "KN", "iso3" : "KNA", "name": "St. Kitts", "data": false, "extended": false },
		{ "iso2": "LC", "iso3" : "LCA", "name": "St. Lucia", "data": false, "extended": false },
		{ "iso2": "PM", "iso3" : "SPM", "name": "St. Pierre and Miquelon", "data": false, "extended": false },
		{ "iso2": "VC", "iso3" : "VCT", "name": "St. Vincent", "data": false, "extended": false },
		{ "iso2": "TT", "iso3" : "TTO", "name": "Trinidad and Tobago", "data": false, "extended": false },
		{ "iso2": "TC", "iso3" : "TCA", "name": "Turks and Caicos Islands", "data": false, "extended": false },
		{ "iso2": "VI", "iso3" : "VIR", "name": "US Virgin Islands", "data": false, "extended": false },
		{ "iso2": "US", "iso3" : "USA", "name": "United States", "data": false, "extended": false },
		{ "iso2": "SX", "iso3" : "SXM", "name": "Sint Maarten", "data": false, "extended": false },
		{ "iso2": "AR", "iso3" : "ARG", "name": "Argentina", "data": false, "extended": false },
		{ "iso2": "BO", "iso3" : "BOL", "name": "Bolivia", "data": false, "extended": false },
		{ "iso2": "BR", "iso3" : "BRA", "name": "Brazil", "data": false, "extended": false },
		{ "iso2": "CL", "iso3" : "CHL", "name": "Chile", "data": false, "extended": false },
		{ "iso2": "CO", "iso3" : "COL", "name": "Colombia", "data": false, "extended": false },
		{ "iso2": "EC", "iso3" : "ECU", "name": "Ecuador", "data": false, "extended": false },
		{ "iso2": "FK", "iso3" : "FLK", "name": "Falkland Islands", "data": false, "extended": false },
		{ "iso2": "GF", "iso3" : "GUF", "name": "French Guiana", "data": false, "extended": false },
		{ "iso2": "GY", "iso3" : "GUF", "name": "Guiana", "data": false, "extended": false },
		{ "iso2": "GY", "iso3" : "GUY", "name": "Guyana", "data": false, "extended": false },
		{ "iso2": "PY", "iso3" : "PRY", "name": "Paraguay", "data": false, "extended": false },
		{ "iso2": "PE", "iso3" : "PER", "name": "Peru", "data": false, "extended": false },
		{ "iso2": "SR", "iso3" : "SUR", "name": "Suriname", "data": false, "extended": false },
		{ "iso2": "UY", "iso3" : "URY", "name": "Uruguay", "data": false, "extended": false },
		{ "iso2": "VE", "iso3" : "VEN", "name": "Venezuela", "data": false, "extended": false }
    ]
},
{
    "name": "Europe",
    "code": "europe",
    "countries": [
		{ "iso2": "AL", "iso3" : "ALB", "name": "Albania", "data": false, "extended": false },
		{ "iso2": "AD", "iso3" : "AND", "name": "Andorra", "data": false, "extended": false },
		{ "iso2": "AT", "iso3" : "AUT", "name": "Austria", "data": false, "extended": false },
		{ "iso2": "BY", "iso3" : "BLR", "name": "Belarus", "data": false, "extended": false },
		{ "iso2": "BE", "iso3" : "BEL", "name": "Belgium", "data": false, "extended": false },
		{ "iso2": "BA", "iso3" : "BIH", "name": "Bosnia and Herzegovina", "data": false, "extended": false },
		{ "iso2": "BG", "iso3" : "BGR", "name": "Bulgaria", "data": false, "extended": false },
		{ "iso2": "HR", "iso3" : "HRV", "name": "Croatia", "data": false, "extended": false },
		{ "iso2": "CY", "iso3" : "CYP", "name": "Cyprus", "data": false, "extended": false },
		{ "iso2": "CZ", "iso3" : "CZE", "name": "Czech Republic", "data": false, "extended": false },
		{ "iso2": "DK", "iso3" : "DNK", "name": "Denmark", "data": false, "extended": false },
		{ "iso2": "EE", "iso3" : "EST", "name": "Estonia", "data": false, "extended": false },
		{ "iso2": "FO", "iso3" : "FRO", "name": "Faroe Islands", "data": false, "extended": false },
		{ "iso2": "FI", "iso3" : "FIN", "name": "Finland", "data": false, "extended": false },
		{ "iso2": "FR", "iso3" : "FRA", "name": "France", "data": true, "extended": false },
		{ "iso2": "DE", "iso3" : "DEU", "name": "Germany", "data": false, "extended": false },
		{ "iso2": "GI", "iso3" : "GIB", "name": "Gibraltar", "data": false, "extended": false },
		{ "iso2": "GR", "iso3" : "GRC", "name": "Greece", "data": false, "extended": false },
		{ "iso2": "HU", "iso3" : "HUN", "name": "Hungary", "data": false, "extended": false },
		{ "iso2": "IS", "iso3" : "ISL", "name": "Iceland", "data": false, "extended": false },
		{ "iso2": "IE", "iso3" : "IRL", "name": "Ireland", "data": false, "extended": false },
		{ "iso2": "IT", "iso3" : "ITA", "name": "Italy", "data": false, "extended": false },
		{ "iso2": "LV", "iso3" : "LVA", "name": "Latvia", "data": false, "extended": false },
		{ "iso2": "LI", "iso3" : "LIE", "name": "Liechtenstein", "data": false, "extended": false },
		{ "iso2": "LT", "iso3" : "LTU", "name": "Lithuania", "data": false, "extended": false },
		{ "iso2": "LU", "iso3" : "LUX", "name": "Luxembourg", "data": false, "extended": false },
		{ "iso2": "MK", "iso3" : "MKD", "name": "Macedonia", "data": false, "extended": false },
		{ "iso2": "MT", "iso3" : "MLT", "name": "Malta", "data": false, "extended": false },
		{ "iso2": "MD", "iso3" : "MDA", "name": "Moldova", "data": false, "extended": false },
		{ "iso2": "MC", "iso3" : "MCO", "name": "Monaco", "data": false, "extended": false },
		{ "iso2": "NL", "iso3" : "NLD", "name": "Netherlands", "data": false, "extended": false },
		{ "iso2": "NO", "iso3" : "NOR", "name": "Norway", "data": false, "extended": false },
		{ "iso2": "PL", "iso3" : "POL", "name": "Poland", "data": false, "extended": false },
		{ "iso2": "PT", "iso3" : "PRT", "name": "Portugal", "data": true, "extended": false },
		{ "iso2": "RO", "iso3" : "ROU", "name": "Romania", "data": false, "extended": false },
		{ "iso2": "RU", "iso3" : "RUS", "name": "Russia", "data": true, "extended": false },
		{ "iso2": "SM", "iso3" : "SMR", "name": "San Marino", "data": false, "extended": false },
		{ "iso2": "RS", "iso3" : "SRB", "name": "Serbia", "data": false, "extended": false },
		{ "iso2": "SK", "iso3" : "SVK", "name": "Slovakia", "data": false, "extended": false },
		{ "iso2": "SI", "iso3" : "SVN", "name": "Slovenia", "data": false, "extended": false },
		{ "iso2": "ES", "iso3" : "ESP", "name": "Spain", "data": true, "extended": false },
		{ "iso2": "SE", "iso3" : "SWE", "name": "Sweden", "data": false, "extended": false },
		{ "iso2": "CH", "iso3" : "CHE", "name": "Switzerland", "data": false, "extended": false },
		{ "iso2": "UA", "iso3" : "UKR", "name": "Ukraine", "data": false, "extended": false },
		{ "iso2": "GB", "iso3" : "GBR", "name": "United Kingdom", "data": false, "extended": false },
		{ "iso2": "VA", "iso3" : "VAT", "name": "Vatican city", "data": false, "extended": false },
		{ "iso2": "RS", "iso3" : "RSB", "name": "Yugoslavia", "data": false, "extended": false },
		{ "iso2": "IM", "iso3" : "IMN", "name": "Isle of Man", "data": false, "extended": false },
		{ "iso2": "RS", "iso3" : "XKX", "name": "Kosovo", "data": false, "extended": false },
		{ "iso2": "ME", "iso3" : "MNE", "name": "Montenegro", "data": false, "extended": false }
    ]
},
{
    "name": "Oceania",
    "code": "oceania",
    "countries": [
		{ "iso2": "AS", "iso3" : "ASM", "name": "American Samoa", "data": false, "extended": false },
		{ "iso2": "AU", "iso3" : "AUS", "name": "Australia", "data": false, "extended": false },
		{ "iso2": "NZ", "iso3" : "NZL", "name": "Chatham Island, NZ", "data": false, "extended": false },
		{ "iso2": "CK", "iso3" : "COK", "name": "Cook Islands", "data": false, "extended": false },
		{ "iso2": "FJ", "iso3" : "FJI", "name": "Fiji Islands", "data": false, "extended": false },
		{ "iso2": "PF", "iso3" : "PYF", "name": "French Polynesia", "data": false, "extended": false },
		{ "iso2": "GU", "iso3" : "GUM", "name": "Guam", "data": false, "extended": false },
		{ "iso2": "KI", "iso3" : "KIR", "name": "Kiribati", "data": false, "extended": false },
		{ "iso2": "MP", "iso3" : "MNP", "name": "Mariana Islands", "data": false, "extended": false },
		{ "iso2": "MH", "iso3" : "MHL", "name": "Marshall Islands", "data": false, "extended": false },
		{ "iso2": "FM", "iso3" : "FSM", "name": "Federated States of Micronesia", "data": false, "extended": false },
		{ "iso2": "UM", "iso3" : "UMI", "name": "Midway Islands", "data": false, "extended": false },
		{ "iso2": "NR", "iso3" : "NRU", "name": "Nauru", "data": false, "extended": false },
		{ "iso2": "NC", "iso3" : "NCL", "name": "New Caledonia", "data": false, "extended": false },
		{ "iso2": "NZ", "iso3" : "NZL", "name": "New Zealand", "data": false, "extended": false },
		{ "iso2": "NU", "iso3" : "NIU", "name": "Niue", "data": false, "extended": false },
		{ "iso2": "NF", "iso3" : "NFK", "name": "Norfolk Island", "data": false, "extended": false },
		{ "iso2": "PW", "iso3" : "PLW", "name": "Palau", "data": false, "extended": false },
		{ "iso2": "PG", "iso3" : "PNG", "name": "Papua New Guinea", "data": false, "extended": false },
		{ "iso2": "MP", "iso3" : "MNP", "name": "Saipan", "data": false, "extended": false },
		{ "iso2": "SB", "iso3" : "SLB", "name": "Solomon Islands", "data": false, "extended": false },
		{ "iso2": "TK", "iso3" : "TKL", "name": "Tokelau", "data": false, "extended": false },
		{ "iso2": "TO", "iso3" : "TON", "name": "Tonga", "data": false, "extended": false },
		{ "iso2": "TV", "iso3" : "TUV", "name": "Tuvalu", "data": false, "extended": false },
		{ "iso2": "VU", "iso3" : "VUT", "name": "Vanuatu", "data": false, "extended": false },
		{ "iso2": "UM", "iso3" : "UMI", "name": "Wake Island", "data": false, "extended": false },
		{ "iso2": "WF", "iso3" : "WLF", "name": "Wallis and Futuna Islands", "data": false, "extended": false },
		{ "iso2": "WS", "iso3" : "WSM", "name": "Samoa", "data": false, "extended": false },
		{ "iso2": "TL", "iso3" : "TLS", "name": "East Timor", "data": false, "extended": false }
    ]
}
];

//

function cloneObject(obj) {
	var o = {};
	
	for (var property in obj)
		o[property] = obj[property];
		
	return o;
}

// Indicator select

var selectedIndicator = '';
var selectedYear = 2012;

var indicatorSelect = document.getElementById('indicator-select');

indicatorSelect.onchange = function() {
	selectedIndicator = this.options[this.selectedIndex].value;
	
	showChartsByRegion(selectedRegion);
	loadHeatMap(selectedRegion, selectedYear);
	
	var texts = document.querySelectorAll('span.indicator-name');
	
	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;
}

indicatorSelect.selectedIndex = 0;
indicatorSelect.onchange();
var selectedRegion = 'global';

// Charts

function showChartsByRegion(region) {
	updateCompareChart(selectedIndicator, selectedYear);
	updateTimelineChart(selectedIndicator, selectedYear);
}

function updateCompareChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-region-bar-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var countries = selectedRegion == 'global' ? getAllCountries() : getCountriesByRegion(selectedRegion);

	options.series = [];
	options.serieColours = [];
	
	var colour1 = {
		r: 17,
		g: 132,
		b: 167
	};
	
	var colour2 = {
		r: 169,
		g: 245,
		b: 188
	};
	
	for (var i = 0; i < countries.length; i++) {
		Math.seedrandom(countries[i].iso3 + selectedIndicator + selectedYear);
	
		var serie = {
			'name': countries[i].name,
			'values': [
				random(1, 100)
			]
		};
		
		options.series.push(serie);
	}
	
	for (var i = 0; i < countries.length; i++) {
		options.serieColours.push(makeGradientColour(colour1, colour2, (i / countries.length) * 100).cssColour);
	}
	
	options.series.sort(function(a, b) {
		return b.values[0] - a.values[0];
	});

	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.barChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

function updateTimelineChart(selectedIndicator, selectedYear) {
	var options = chartOptions['chart-timeline-comparison'];
	
	var container = document.querySelector(options.container);
	
	if (!container)
		return;
		
	var compareIndicator = document.getElementById('region-comparer');
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
		Math.seedrandom(selectedIndicator + selectedYear + i);
		options.series[0].values.push(random(1, 200));
		Math.seedrandom(compareIndicator + selectedYear + i);
		options.series[1].values.push(random(1, 200));
		
		options.xAxis.values.push(i);
	}
	
	options.width = container.offsetWidth;
	options.height = container.offsetHeight;
	
	var chart = wesCountry.charts.lineChart(options);
	container.innerHTML = '';
	container.appendChild(chart.render());
}

showChartsByRegion('global');
document.getElementById('region-select').selectedIndex = 0;

// Map

function getCountriesByRegion(region) {
	var countries = [];
	
	for (var i = 0; i < continents.length; i++) {
		if (continents[i].code == region) {
			for (var j = 0; j < continents[i].countries.length; j++)
				countries.push(continents[i].countries[j]);
			
			break;
		}
	}
	
	return countries;
}

function getAllCountries() {
	var countries = [];
	
	for (var i = 0; i < continents.length; i++) {
		for (var j = 0; j < continents[i].countries.length; j++)
			countries.push(continents[i].countries[j]);
	}
	
	return countries;
}

function loadHeatMap(region, year) {
	var countryData = {};
	
	var countries = region == 'global' ? getAllCountries() : getCountriesByRegion(region);
	
	for (var i = 0; i < countries.length; i++) {
		var code = countries[i].iso2;
		
		selectedIndicator = indicatorSelect.options[indicatorSelect.selectedIndex].value;
		
		Math.seedrandom(code + selectedIndicator + year);
		
		var value = random(1, 100);
		
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

loadHeatMap('global', 2012);

// Region select

var regionSelect = document.getElementById('region-select');

regionSelect.onchange = function() {
	var region = this.options[this.selectedIndex].value;
	
	selectedRegion = region;
	
	showChartsByRegion(region);
	loadHeatMap(selectedRegion, selectedYear);
	
	var texts = document.querySelectorAll('span.region-name');
	
	for (var i = 0; i < texts.length; i++)
		texts[i].innerHTML = this.options[this.selectedIndex].innerHTML;
}

regionSelect.onchange();

// Map timeline

var years = document.querySelectorAll('.timeline .line .year a');

for (var i = 0; i < years.length; i++) {
	years[i].onclick = function() {
		for (var j = 0; j < years.length; j++)
			years[j].parentNode.className = "year";
			
		this.parentNode.className = "year selected";
		
		selectedYear = this.title;
		
		loadHeatMap(selectedRegion, selectedYear);
		showChartsByRegion(selectedRegion);
		
		return false;	
	}
}

// Source select

var sourceSelect = document.getElementById('source-select');
sourceSelect.selectedIndex = 0;

sourceSelect.onchange = function() {
	var source = this.options[this.selectedIndex].value;
	
	var indicatorSelect = document.getElementById('indicator-select');
	
	var indicatorOption = document.querySelector('#indicator-select optgroup[label="' + source + '"] option:first-child');
	
	if (indicatorOption) {
		indicatorSelect.selectedIndex = indicatorOption.index;
		indicatorSelect.onchange();	
	}
}

// Colours

function makeGradientColour(colour1, colour2, percent) {
    var newColour = {};

    function makeChannel(a, b) {
        return(a + Math.round((b - a) * (percent / 100)));
    }

    function makeColourPiece(num) {
        num = Math.min(num, 255);   // not more than 255
        num = Math.max(num, 0);     // not less than 0
        
        var str = num.toString(16);
        
        if (str.length < 2) {
            str = "0" + str;
        }
        
        return(str);
    }

    newColour.r = makeChannel(colour1.r, colour2.r);
    newColour.g = makeChannel(colour1.g, colour2.g);
    newColour.b = makeChannel(colour1.b, colour2.b);
    newColour.cssColour = "#" + 
                        makeColourPiece(newColour.r) + 
                        makeColourPiece(newColour.g) + 
                        makeColourPiece(newColour.b);
                        
    return(newColour);
}

/* Country select */

document.getElementById('country-select').onchange = function() {
	
	window.location.href = '/countries/' + this.options[this.selectedIndex].value;
}

document.getElementById('region-comparer').onchange = function() {
	updateTimelineChart(selectedIndicator, selectedYear);
};

function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}
document.getElementById('country-select').onchange = function() {
	var country = this.options[this.selectedIndex].value;
	window.location.href = '/countries/' + country + '/details';
}

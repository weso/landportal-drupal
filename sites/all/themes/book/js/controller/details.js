document.getElementById('country-select').onchange = function() {
	window.location.href = '/book/countries/' + this.options[this.selectedIndex].value;
}

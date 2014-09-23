document.getElementById('source-selector').onchange = function() {
	var source = this.options[this.selectedIndex].value;
	window.location.href = '/book/sources/' + source;
}

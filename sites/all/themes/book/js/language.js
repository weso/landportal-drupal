var links = document.querySelectorAll('.selected-language a.language');

for (var i = 0; i < links.length; i++) {
	links[i].onclick = function() {
		document.getElementById('selected-language').value = this.innerHTML;
		document.getElementById('language-selection').submit();
		
		return false;
	}
}
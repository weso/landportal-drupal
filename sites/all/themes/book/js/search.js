/**
 * This function rewrites the search url appending the text obtained from the
 * user input.
 */
function landportalSearchListener()
{
	var url= "/search/site/" + document.getElementById("srch-term").value;
	location.href = url;
	return false;
}
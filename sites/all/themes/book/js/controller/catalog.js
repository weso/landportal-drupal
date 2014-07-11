var ckanURL = 'http://5.9.221.11/data/';

$( document ).ajaxStart(function() {
	showLoading();
});
$( document ).ajaxComplete(function() {
	hideLoading();
});

firstLoad();

$("#srch-term-ckan").keypress(function(event) {
	if(event.which == 13) {
		loadSearchResults();
		$(this).val("");
	}
});

function showLoading() {
    //$("#loading-dialog").modal();
}
        
function hideLoading() {
    //$("#loading-dialog").modal('hide');
}
		
function firstLoad() {
	getFullPackages(100,0, function(output) {
		var packages = output;
		if(packages.success) {
			formatContent(packages.result, true);
		} else {
		$(".result-content").html("<div class='row'><div class='col-sm-9 dataset-message'>{{#labels}}{{no_datasets}}{{/labels}}</div></div>");
		}
	});
}

function loadSearchResults() {
	var keywords = $("#srch-term-ckan").val();
	searchPackages(keywords, function(output) {
		var packages = output;
		if(packages.success) {
			formatContent(packages.result.results, true);
		} else {
		$(".result-content").html("<div class='row'><div class='col-sm-9 dataset-message'>{{#labels}}{{no_datasets}}{{/labels}}</div></div>");
	}
	}); 
}

function formatContent(packages, fullMode) {
	$("#panel-datasets").empty();		
	organizations = {};
	organizations_ids = {};
	groups = {};
	groups_ids = {};
	tags = {};
	tags_ids = {};
	formats = {};
	licenses = {};
	
	if(fullMode) {
		datasets = packages;
	} else {
		datasets = packages.packages;
	}
	
	$.each(datasets, function(index, dataset) {
		$("#panel-datasets").append(formatDatasetResult(dataset, index));
		if(fullMode) {
			extractDatasetOrganizations(dataset, organizations, organizations_ids);
			extractDatasetGroups(dataset, groups, groups_ids);
			extractDatasetTags(dataset, tags, tags_ids);
			extractDatasetFormats(dataset, formats);
			extractDatasetLicenses(dataset, licenses);
		} else {
			if(typeof packages.is_organization == 'undefined') {
				extractDatasetOrganizations(packages, organizations, organizations_ids);
			} if(typeof packages.is_group == 'undefined') {
				extractDatasetGroups(packages, groups, groups_ids);
			} if (typeof packages.is_tag == 'undefined') {
				extractDatasetTags(packages, tags, tags_ids);
			}
			extractDatasetFormats(dataset, formats);
			extractDatasetLicenses(dataset, licenses);
		}
	});
	
	if(typeof packages.is_organization == 'undefined') {
		formatOrganizations(organizations, organizations_ids);
	} if(typeof packages.is_group == 'undefined') {
		formatGroups(groups, groups_ids);
	} if (typeof packages.is_tag == 'undefined') {
		formatTags(tags, tags_ids);
	}
	formatFormats(formats);
	formatLicenses(licenses);
	
	wesCountry.table.pages.apply();
}

function extractDatasetOrganizations(dataset, organizations, organizations_ids) {
	if (typeof dataset.organization != 'undefined') {
		organization = dataset.organization.title;
		
		if(organizations[organization] != undefined) {
			organizations[organization]++;
		} else {
			organizations[organization] = 1;
			organizations_ids[organization] = dataset.organization.name;
		}
	}
}

function extractDatasetGroups(dataset, groups, groups_ids) {
	if (typeof dataset.groups != 'undefined') {
		$.each(dataset.groups, function(index, group) {
			groupTitle = group.title;
			
			if(groups[groupTitle] != undefined) {
				groups[groupTitle]++;
			} else {
				groups[groupTitle] = 1;
				groups_ids[groupTitle] = group.name;
			}
		});
	}
}

function extractDatasetTags(dataset, tags, tags_ids) {
	if (typeof dataset.tags != 'undefined') {
		$.each(dataset.tags, function(index, tag) {
			tagTitle = tag.display_name;
			
			if(tags[tagTitle] != undefined) {
				tags[tagTitle]++;
			} else {
				tags[tagTitle] = 1;
				tags_ids[tagTitle] = tag.name;
			}
		});
	}
}

function extractDatasetFormats(dataset, formats) {
	if(typeof dataset.resources != 'undefined') {
		$.each(dataset.resources, function(index, resource) {
			format = resource.format;
			
			if (format != "") {
				if(formats[format] != undefined) {
					formats[format]++;
				} else {
					formats[format] = 1;
				}
			}
		});
	}
}

function extractDatasetLicenses(dataset, licenses) {
	if (dataset.license_title != undefined) {
		license = dataset.license_title;

		if(licenses[license] != undefined) {
			licenses[license]++;
		} else {
			licenses[license] = 1;
		}
	}
}

function formatOrganizations(organizations, organizations_ids) {
	if (!$.isEmptyObject(organizations)) {
		$("#panel-organizations .panel-footer").remove();

		organizationsPanel = $("#panel-organizations .list-group");
		organizationsPanel.empty();
		counter=0;
		
		$.each(organizations, function(organizationName, appearances) {
			organizationLink = $("<a>", {href: ckanURL + "organization/" + organizations_ids[organizationName]});
			organizationRow = $("<li>", {class: "list-group-item"});
			organizationLink.html(organizationName + " (" + appearances + ")");
			organizationRow.append(organizationLink);
			organizationsPanel.append(organizationRow);
			counter++;
		});	
		
		if(counter > 5) {
			$("#panel-organizations").append(createFilterPanelFooter());
		}
	}
}

function formatGroups(groups, groups_ids) {
	if(!$.isEmptyObject(groups)) {
		$("#panel-groups .panel-footer").remove();

		groupsPanel = $("#panel-groups .list-group");
		groupsPanel.empty();
		
		counter = 0;
		$.each(groups, function(groupName, appearances) {
			groupLink = $("<a>", {href: ckanURL + "group/" + groups_ids[groupName]});
			groupRow = $("<li>", {class: "list-group-item"});
			groupLink.html(groupName + " (" + appearances + ")");
			groupRow.append(groupLink);
			groupsPanel.append(groupRow);
			counter++;
		});	
		
		if(counter > 5) {
			$("#panel-groups").append(createFilterPanelFooter());
		}
	}
}

function formatTags(tags, tags_ids) {
	if(!$.isEmptyObject(tags)) {
		$("#panel-tags .panel-footer").remove();

		tagsPanel = $("#panel-tags .list-group");
		tagsPanel.empty();
		counter = 0;
		$.each(tags, function(tagName, appearances) {
			tagLink = $("<a>", {href: ckanURL + "tag/" + tags_ids[tagName]});
			tagRow = $("<li>", {class: "list-group-item"});
			tagLink.html(tagName + " (" + appearances + ")");
			tagRow.append(tagLink);
			tagsPanel.append(tagRow);
			counter++;
		});
		
		if(counter > 5) {
			$("#panel-tags").append(createFilterPanelFooter());
		}
	}
}

function formatFormats(formats) {
	if(!$.isEmptyObject(formats)) {
		$("#panel-formats .panel-footer").remove();

		formatsPanel = $("#panel-formats .list-group");
		formatsPanel.empty();
		counter = 0;
		$.each(formats, function(formatName, appearances) {
			formatLink = $("<a>", {href: ckanURL + "dataset?res_format=" + formatName})
			formatRow = $("<li>", {class: "list-group-item"});
			formatLink.html(formatName + " (" + appearances + ")");
			formatRow.append(formatLink);
			formatsPanel.append(formatRow);
			counter++;
		});	
		
		if(counter > 5) {
			$("#panel-formats").append(createFilterPanelFooter());
		}
	}
}

function formatLicenses(licenses) {
	if(!$.isEmptyObject(licenses)) {
		$("#panel-licenses .panel-footer").remove();
		licensesPanel = $("#panel-licenses .list-group");
		licensesPanel.empty();
		counter = 0;
		$.each(licenses, function(licenseName, appearances) {
			licenseLink = $("<a>", {href: ckanURL + "dataset?license_title=" + licenseName})
			licenseRow = $("<li>", {class: "list-group-item"});
			licenseLink.html(licenseName + " (" + appearances + ")");
			licenseRow.append(licenseLink);
			licensesPanel.append(licenseRow);
			counter++;
		});	
		
		if(counter > 5) {
			$("#panel-licenses").append(createFilterPanelFooter());
		}
	}
}

function createFilterPanelFooter() {
	panelFooter = $("<div>", {class: "panel-footer  clickable", onclick: "expandPanel(this)"});
	panelFooter.html("Show more");
	return panelFooter;
}

function expandPanel(panel) {
	$(panel).parent().toggleClass("ckan-filter-panel");
	if ($(panel).parent().hasClass("ckan-filter-panel")) {
		$(panel).html("Show more");
	} else {
		$(panel).html("Show less");	
	}
	
}

function showElement(elementId) {
	$("#" + elementId).removeClass("hidden");
}

function hideElement(elementId) {
	$("#" + elementId).addClass("hidden");
}

function formatDatasetResult(dataset, index){
	$packagePanel = $("<li>", {class: "list-group-item", 
							   onmouseover: "showElement( 'package" + index+"');",
							   onmouseout: "hideElement( 'package" + index+"');"});
	$packageTitle = $("<a>", {href: ckanURL + "dataset/" + dataset.name});
	$packageTitle.html(dataset.title);
	$packagePanel.hover(function() {
						$("#" + elementId).toggleClass("hidden");
						alert("Hey!");
						},
						function() {
						$("#" + elementId).toggleClass("hidden");
						});
	
	$packageResourcesNumber = $("<span>", {class: "package-resources"});
	$packageResourcesNumber.html("(" + dataset.num_resources + ")");
	$packagePanel.append($packageTitle);
	$packagePanel.append($packageResourcesNumber);
	
	$collapsableDiv = $("<div>", {id: "package" + index, class: "hidden"});
	
	$packagePanelBody = $("<div>", {class: "panel-body"});
	$packageDescription = $("<p>", {class: "package-description"});
	$packageDescription.html(dataset.notes);
	
	$packageFormats = $("<div>", {class: "package-formats"});
	
	$packagePanelBody.append($packageDescription);
	
	if(typeof dataset.resources != 'undefined') {
		$.each(dataset.resources, function(index, resource) {
			$resourceDiv = $("<div>", {class: "package-resource"});
			$resourceLink = $("<a>", {href: resource.url});
			$resourceLink.html(resource.name);
			
			$formatLabelLink = $("<a>", {href: resource.url});
			$formatLabel = $("<span>", {class: "label label-primary ckan-resource-url"});
			$formatLabel.html(resource.format);
			$formatLabelLink.append($formatLabel);
			$resourceDiv.append($formatLabelLink);
			$resourceDiv.append($resourceLink);
			$packageFormats.append($resourceDiv);
		});
		$packagePanelBody.append($packageFormats);
	}
	
	$collapsableDiv.append($packagePanelBody);
	$packagePanel.append($collapsableDiv);
	
	return $packagePanel;
}

/* Collapsabe code, replaced by simple lists */
/*
function formatDatasetResult(dataset, index){
	$packagePanel = $("<div>", {class: "panel panel-default"});
	
	$packageHeading = $("<div>", {class: "panel-heading"});
	$packagePanelTitle = $("<h4>", {class : "panel-title"});
	$packageTitle = $("<a>", {href: ckanURL + "dataset/" + dataset.name});
	$packageTitle.attr("data-toggle", "collapse");
	$packageTitle.attr("data-parent", "#accordion"); 
	$packageTitle.html(dataset.title);
	$packageResourcesNumber = $("<span>", {class: "package-resources"});
	$packageResourcesNumber.html("(" + dataset.num_resources + ")");
	$packagePanelTitle.append($packageTitle);
	$packagePanelTitle.append($packageResourcesNumber);
	$packageHeading.append($packagePanelTitle);
	$packagePanel.append($packageHeading);
	
	if (index == 0) {
		$collapsableDiv = $("<div>", {id: "package" + index, class: "panel-collapse collapse in"});
	} else {
		$collapsableDiv = $("<div>", {id: "package" + index, class: "panel-collapse collapse"});
	}
	$packagePanelBody = $("<div>", {class: "panel-body"});
	$packageDescription = $("<p>", {class: "package-description"});
	$packageDescription.html(dataset.notes);
	
	$packageFormats = $("<div>", {class: "package-formats"});
	
	$packagePanelBody.append($packageDescription);
	if(typeof dataset.resources != 'undefined') {
		$.each(dataset.resources, function(index, resource) {
			$resourceDiv = $("<div>", {class: "package-resource"});
			$resourceLink = $("<a>", {href: resource.url});
			$resourceLink.html(resource.name);
			
			$formatLabelLink = $("<a>", {href: resource.url});
			$formatLabel = $("<span>", {class: "label label-primary ckan-resource-url"});
			$formatLabel.html(resource.format);
			$formatLabelLink.append($formatLabel);
			$resourceDiv.append($formatLabelLink);
			$resourceDiv.append($resourceLink);
			$packageFormats.append($resourceDiv);
		});
		$packagePanelBody.append($packageFormats);
	}
	$collapsableDiv.append($packagePanelBody);
	$packagePanel.append($collapsableDiv);
	
	return $packagePanel;
}*/

function getFullPackages(limit, offset, callback) {
	if(typeof(limit)==='undefined') limit = false;
	if(typeof(offset)==='undefined') offset = false;

	var arguments = [limit, offset];
	doAjaxQuery('get_full_packages', arguments, callback);
}

function getPackages(limit, offset) {
	if(typeof(limit)==='undefined') limit = false;
	if(typeof(offset)==='undefined') offset = false;

	var arguments = [limit, offset];
	var json = doAjaxQuery('get_packages', arguments);
}

function getPackage(packageId) {
	var arguments = [packageId];
	var json = doAjaxQuery('get_package', arguments);
}

function getGroups(orderBy, sort, groups, all_fields) {
	if(typeof(orderBy)==='undefined') orderBy = false;
	if(typeof(sort)==='undefined') sort = false;
	if(typeof(groups)==='undefined') groups = false;
	if(typeof(all_fields)==='undefined') all_fields = false;

	var arguments = [orderBy, sort, groups, all_fields];
	var json = doAjaxQuery('get_groups', arguments);
}

function getGroup(groupId) {
	var arguments = [groupId];
	var json = doAjaxQuery('get_group', arguments);
}

function getGroupPackages(groupId) {
	var arguments = [groupId];
	doAjaxQuery('get_group_packages', arguments, function(output) {
		var packages = output;
		emptyFilterPanels();
		if(packages.success) {
			groupsPanel = $("#panel-groups .list-group");
			groupsPanel.empty();
			groupRow = $("<li>", {id: packages.id, class: "list-group-item active-filter clickable", onclick: "firstLoad()"});
			groupRow.html(packages.result.display_name + " (" + packages.result.package_count + ")");
			groupsPanel.append(groupRow);
			formatContent(packages.result, false);
		} else {
			$(".result-content").html("<div class='row'><div class='col-sm-9 dataset-message'>{{#labels}}{{no_datasets}}{{/labels}}</div></div>");
		}
	});
}

function getOrganizationPackages(organizationId) {
	var arguments = [organizationId];
	doAjaxQuery('get_organization_packages', arguments, function(output) {
		var packages = output;
		emptyFilterPanels();
		if(packages.success) {
			organizationsPanel = $("#panel-organizations .list-group");
			organizationsPanel.empty();
			organizationRow = $("<li>", {id: packages.id, class: "list-group-item active-filter clickable", onclick: "firstLoad()"});
			organizationIcon = $("<i>", {class: "glyphicon glyphicon-remove"});
			organizationRow.append(organizationIcon);
			organizationTitle = $("<span>");
			organizationTitle.html(packages.result.display_name + " (" + packages.result.package_count + ")");
			organizationRow.append(organizationIcon);
			organizationRow.append(organizationTitle);
			
			organizationsPanel.append(organizationRow);
			formatContent(packages.result, false);
		} else {
			$(".result-content").html("<div class='row'><div class='col-sm-9 dataset-message'>{{#labels}}{{no_datasets}}{{/labels}}</div></div>");
		}
	});
}

function getTags(query, vocabularyId, all_fields) {
	if(typeof(query)==='undefined') query = false;
	if(typeof(vocabularyId)==='undefined') vocabularyId = false;
	if(typeof(all_fields)==='undefined') all_fields = false;
	
	var arguments = [query, vocabularyId, all_fields];
	var json = doAjaxQuery('get_tags', arguments);
}

function getTag(tagId) {
	var arguments = [tagId];
	var json = doAjaxQuery('get_tag', arguments);
}

function getTagPackages(tagId) {
	var arguments = [tagId];
	doAjaxQuery('get_tag_packages', arguments, function(output) {
		var packages = output;
		emptyFilterPanels();
		if(packages.success) {
			console.log(JSON.stringify(packages));
			tagsPanel = $("#panel-tags .list-group");
			tagsPanel.empty();
			tagRow = $("<li>", {id: packages.id, class: "list-group-item active-filter clickable", onclick: "firstLoad()"});
			tagRow.html(packages.result.display_name + " (" + packages.result.packages.length + ")");
			tagsPanel.append(tagRow);
			formatContent(packages.result, false);
		} else {
			$(".result-content").html("<div class='row'><div class='col-sm-9 dataset-message'>{{#labels}}{{no_datasets}}{{/labels}}</div></div>");
		}
	});
}

function getLicenses() {
	var json = doAjaxQuery('get_licenses', null)
}

function searchPackages(keywords, callback) {
	var arguments = [keywords];
	doAjaxQuery('search_packages', arguments, callback);
}

function emptyFilterPanels() {
		$("#panel-organizations .list-group").empty();
		$("#panel-groups .list-group").empty();
		$("#panel-tags .list-group").empty();
		$("#panel-formats .list-group").empty();
		$("#panel-licenses .list-group").empty();
		$("#panel-organizations .panel-footer").remove();
		$("#panel-groups .panel-footer").remove();
		$("#panel-tags .panel-footer").remove();
		$("#panel-formats .panel-footer").remove();
		$("#panel-licenses .panel-footer").remove();
}

/*
function doAjaxQuery(phpFunction, phpArguments, handleData) {
	jQuery.ajax({
	    type: "POST",
	    url: $("#api-url").val() + '/ckan_ajax_interface.php',
	    data: {functionname: phpFunction, arguments: phpArguments},
	    success: function (obj, textstatus) {
				console.log(obj);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	  console.log(textStatus, errorThrown);
			  console.log(jqXHR);
        }
	});	
}*/

function doAjaxQuery(phpFunction, phpArguments, handleData) {
	jQuery.ajax({
	    type: "POST",
	    url: $("#api-url").val() + '/ckan_ajax_interface.php',
	    dataType: 'json',
	    data: {functionname: phpFunction, arguments: phpArguments},
	    success: function (obj, textstatus) {
						if( !('error' in obj) ) {
							handleData(obj);
						}
						else {
							console.log(obj.debug);
							console.log(obj.error);
						}
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	  console.log(textStatus, errorThrown);
			  console.log(jqXHR);
        }
	});	
}
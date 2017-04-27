var numberOfSidebars = 6;
var actionTypes = ['Learner_Action', 'Facilitator_Action', 'System_Action'];
var blockTypes = ['Information','Dialogue','Feedback','Practice','Evidence'];
var contextTypes = ['Classroom', 'Online_Synchronous', 'Online_Asynchronous', 'Experiential'];

function openSidebar(sidebar) {
	if (sidebar.hasClass('hidden')) {
		sidebar.addClass('col-md-3');
		sidebar.removeClass('hidden');
		sidebar.addClass('open');
	}
}

function closeSidebar(sidebar) {
	if (sidebar.hasClass('open')) {
		sidebar.removeClass('col-md-3');
		sidebar.removeClass('open');
		sidebar.addClass('hidden');
	}
}

function showOnlySidebar(sidebarNumber) {
	var desiredSidebar = $('#sidebar' + sidebarNumber);

	openSidebar(desiredSidebar);

	for (var index = 0; index < numberOfSidebars; ++index) {
		if (index == sidebarNumber) {
			continue; // Don't close the sidebar that we want open
		}

		var undesiredSidebar = $('#sidebar' + index);
		closeSidebar(undesiredSidebar);
	}
}

function toggleSidebar(i, evt) {
	switch (i) {
		case 0: // default
			showOnlySidebar(0);
			break;
		case 1: // block
			showOnlySidebar(1);
			document.getElementById('inputType').value = evt.cyTarget.json().data.block_type;
			document.getElementById('inputMethod').value = evt.cyTarget.json().data.method;
			document.getElementById('inputDescription').value = evt.cyTarget.json().data.description;
			break;
		case 2: // action
			showOnlySidebar(2);
			document.getElementById('inputAction').value = evt.cyTarget.json().data.action_type;
			if (evt.cyTarget.json().data.description) {
				document.getElementById('actionDescription').value = evt.cyTarget.json().data.description;
			} else {
				document.getElementById('actionDescription').value = "";
			}
			break;
		case 3: // context
			showOnlySidebar(3);
			document.getElementById('inputContext').value = evt.cyTarget.json().data.context_type;
			break;
		case 4: // objective
			showOnlySidebar(4);
			break;
		case 5: // startstop
			showOnlySidebar(5);
			if (typeof(evt.cyTarget.json().data.start) != 'undefined') {
				if (evt.cyTarget.json().data.start) {
					document.getElementById('inputStartstop').value = "Start";
				} else {
					document.getElementById('inputStartstop').value = "Stop";
				}
			}
			break;
	}
}

function typeChange(i) {
	var ele = cy.$('#' + selectedId);

	// Remove classes for all block types
	for (var index in blockTypes) {
		if (ele.hasClass(blockTypes[index])) {
			ele.removeClass(blockTypes[index]);
		}
	}

	setBlockType(ele, blockTypes[i]);
}

function setBlockType(element, blockType) {
	element.addClass(blockType);

	var spaceBlockType = blockType.replace("_"," ");
	document.getElementById('inputType').value = spaceBlockType;
	element.data('block_type', spaceBlockType);
}

function actionChange(i) {
	var ele = cy.$('#' + selectedId);

	// Remove classes for all action types
	for (var index in actionTypes) {
		if (ele.hasClass(actionTypes[index])) {
			ele.removeClass(actionTypes[index]);
		}
	}

	setActionType(ele, actionTypes[i]);
}

function setActionType(element, actionType) {
	element.addClass(actionType);

	var spaceActionType = actionType.replace("_"," ");
	document.getElementById('inputAction').value = spaceActionType;
	element.data('action_type', spaceActionType);
}

function actionDescriptionChange() {
	var new_description = document.getElementById('actionDescription').value;
	cy.$('#' + selectedId).data('description', new_description);
	var json = cy.$('#' + selectedId).json();
	cy.$('#' + selectedId).css({label: json.data.description});
}

function contextChange(i) {
	var ele = cy.$('#' + selectedId);

	// Remove classes for all action types
	for (var index in contextTypes) {
		if (ele.hasClass(contextTypes[index])) {
			ele.removeClass(contextTypes[index]);
		}
	}

	setContextType(ele, contextTypes[i]);
}

function setContextType(element, contextType) {
	element.addClass(contextType);

	var spaceContextType = contextType.replace("_"," ");
	document.getElementById('inputContext').value = spaceContextType;
	element.data('context_type', spaceContextType);
	element.css({label: spaceContextType});
}

function methodChange() {
	var new_method = document.getElementById('inputMethod').value;
	cy.$('#' + selectedId).data('method', new_method);
	updateLabel();
}

function descriptionChange() {
	var new_description = document.getElementById('inputDescription').value;
	cy.$('#' + selectedId).data('description', new_description);
	updateLabel();
}

function startstopChange(start) {
	var ele = cy.$('#' + selectedId);
	if (start) {
		ele.data('start', true);
		ele.css({label: "Start"});
		document.getElementById('inputStartstop').value = 'Start';
	} else {
		ele.data('start', false);
		ele.css({label: "Stop"});
		document.getElementById('inputStartstop').value = 'Stop';
	}
}

function objectiveChange() {
	var new_description = document.getElementById('inputObjective').value;
	cy.$('#' + selectedId).data('description', new_description);
	cy.$('#' + selectedId).css({label: new_description});
}

function updateLabel() {
	var json = cy.$('#' + selectedId).json();
	cy.$('#' + selectedId).css({label: json.data.description + "\n\n\n\n" + json.data.method});
}

function redraw() {
	var layout = cy.makeLayout({
		// https://github.com/cytoscape/cytoscape.js-dagre
		name: 'dagre',
		rankDir: 'LR',
		avoidOverlap: true,
		avoidOverlapPadding: 40
	});
	layout.run();
}

function clearCanvas() {
	cy.remove('[id != "stop"][id != "start"]');
	cy.center();
	cy.zoom(1);
}

function undo() {
	ur.undo();
}

function redo() {
	ur.redo();
}

function loadFavoriteTemplates() {

    var lemSection = $("#templatePanel");

    var lemDivs = "";

		if (globalUsername == undefined) {
			$("#loginForFavorites").show();
			$("#templatePanel").hide()
		} else {
			$("#loginForFavorites").hide();
			$("#templatePanel").show()
		}

    for (lemIndex in globalFavoriteLemsDict) {
      var lem = globalFavoriteLemsDict[lemIndex];

      var imgURL = lem.thumbnail;
      var id = lem._id.$oid;

      // default img
      if (!imgURL) {
        imgURL = "../static/img/templates/no_thumbnail.png";
      }

      lemDivs += generateFavorite(lem.name, imgURL, id);
      // <label for="/static/exampleLems/blendedLearningFlippedClassroom.lem">Blended Learning Flipped Classroom</label>
      //     <img id="/static/exampleLems/blendedLearningFlippedClassroom.lem" src="/static/img/templates/blendedLearningFlippedClassroom.png" draggable="true" ondragstart="drag(event, id)" width='100%' border=5>
      //     <hr>
    }

    lemSection.html(lemDivs);
}

function generateFavorite(title, imgURL, id) {
	var label = '<label for="' + id + '">' + title + '</label>'
	var img = '<img id="favorite_' + id + '" src="' + imgURL + '" draggable="true" ondragstart="drag(event, id)" width="100%" border=5>'
	return label + img + '<hr>'
}

function toggleSidebar(i, evt) {
	switch (i) {
		case 0: // default
			if ($('#sidebar0').hasClass('hidden')) {
				$('#sidebar0').addClass('col-md-3');
				$('#sidebar0').removeClass('hidden');
				$('#sidebar0').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			if ($('#sidebar5').hasClass('open')) {
				$('#sidebar5').removeClass('col-md-3');
				$('#sidebar5').removeClass('open');
				$('#sidebar5').addClass('hidden');
			}
			break;
		case 1: // block
		if ($('#sidebar1').hasClass('hidden')) {
				$('#sidebar1').addClass('col-md-3');
				$('#sidebar1').removeClass('hidden');
				$('#sidebar1').addClass('open');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			if ($('#sidebar5').hasClass('open')) {
				$('#sidebar5').removeClass('col-md-3');
				$('#sidebar5').removeClass('open');
				$('#sidebar5').addClass('hidden');
			}
			document.getElementById('inputType').value = evt.cyTarget.json().data.block_type;
			document.getElementById('inputMethod').value = evt.cyTarget.json().data.method;
			document.getElementById('inputDescription').value = evt.cyTarget.json().data.description;

			break;
		case 2: // action
			if ($('#sidebar2').hasClass('hidden')) {
				$('#sidebar2').addClass('col-md-3');
				$('#sidebar2').removeClass('hidden');
				$('#sidebar2').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			if ($('#sidebar5').hasClass('open')) {
				$('#sidebar5').removeClass('col-md-3');
				$('#sidebar5').removeClass('open');
				$('#sidebar5').addClass('hidden');
			}
			document.getElementById('inputAction').value = evt.cyTarget.json().data.action_type;
			break;
		case 3: // context
			if ($('#sidebar3').hasClass('hidden')) {
				$('#sidebar3').addClass('col-md-3');
				$('#sidebar3').removeClass('hidden');
				$('#sidebar3').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			if ($('#sidebar5').hasClass('open')) {
				$('#sidebar5').removeClass('col-md-3');
				$('#sidebar5').removeClass('open');
				$('#sidebar5').addClass('hidden');
			}
			document.getElementById('inputContext').value = evt.cyTarget.json().data.context_type;
			break;
		case 4: // objective
			if ($('#sidebar4').hasClass('hidden')) {
				$('#sidebar4').addClass('col-md-3');
				$('#sidebar4').removeClass('hidden');
				$('#sidebar4').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar5').hasClass('open')) {
				$('#sidebar5').removeClass('col-md-3');
				$('#sidebar5').removeClass('open');
				$('#sidebar5').addClass('hidden');
			}
			break;
		case 5: // startstop
			if ($('#sidebar5').hasClass('hidden')) {
				$('#sidebar5').addClass('col-md-3');
				$('#sidebar5').removeClass('hidden');
				$('#sidebar5').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
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
	if (ele.hasClass('Information')) {
		ele.removeClass('Information');
	}
	if (ele.hasClass('Practice')) {
		ele.removeClass('Practice');
	}
	if (ele.hasClass('Dialogue')) {
		ele.removeClass('Dialogue');
	}
	if (ele.hasClass('Feedback')) {
		ele.removeClass('Feedback');
	}
	if (ele.hasClass('Evidence')) {
		ele.removeClass('Evidence');
	}

	switch (i) {
		case 0:
			ele.addClass('Information');
			document.getElementById('inputType').value = 'Information';
			ele.data('block_type', 'Information');
			break;
		case 1:
			ele.addClass('Dialogue');
			document.getElementById('inputType').value = 'Dialogue';
			ele.data('block_type', 'Dialogue');
			break;
		case 2:
			ele.addClass('Feedback');
			document.getElementById('inputType').value = 'Feedback';
			ele.data('block_type', 'Feedback');
			break;
		case 3:
			ele.addClass('Practice');
			document.getElementById('inputType').value = 'Practice';
			ele.data('block_type', 'Practice');
			break;
		case 4:
			ele.addClass('Evidence');
			document.getElementById('inputType').value = 'Evidence';
			ele.data('block_type', 'Evidence');
			break;
	}


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

function updateLabel() {
	var json = cy.$('#' + selectedId).json();
	cy.$('#' + selectedId).css({label: json.data.description + "\n\n\n\n" + json.data.method});
}

function actionChange(i) {
	var ele = cy.$('#' + selectedId);
	if (ele.hasClass('Learner_Action')) {
		ele.removeClass('Learner_Action');
	}
	if (ele.hasClass('Facilitator_Action')) {
		ele.removeClass('Facilitator_Action');
	}
	if (ele.hasClass('System_Action')) {
		ele.removeClass('System_Action');
	}

	switch(i) {
		case 0:
			ele.addClass('Learner_Action');
			document.getElementById('inputAction').value = 'Learner Action';
			ele.data('action_type', 'Learner Action');
			break;
		case 1:
			ele.addClass('Facilitator_Action');
			document.getElementById('inputAction').value = 'Facilitator Action';
			ele.data('action_type', 'Facilitator Action');
			break;
		case 2:
			ele.addClass('System_Action');
			document.getElementById('inputAction').value = 'System Action';
			ele.data('action_type', 'System Action');
			break;
	}
}

function contextChange(i) {
	var ele = cy.$('#' + selectedId);
	if (ele.hasClass('Classroom')) {
		ele.removeClass('Classroom');
	}
	if (ele.hasClass('Online_Synchronous')) {
		ele.removeClass('Online_Synchronous');
	}
	if (ele.hasClass('Online_Asynchronous')) {
		ele.removeClass('Online_Asynchronous');
	}
	if (ele.hasClass('Experiential')) {
		ele.removeClass('Experiential');
	}

	switch (i) {
		case 0:
			ele.addClass('Classroom');
			document.getElementById('inputContext').value = 'Classroom';
			ele.data('context_type', 'Classroom');
			ele.css({label: 'Classroom'});
			break;
		case 1:
			ele.addClass('Online_Synchronous');
			document.getElementById('inputContext').value = 'Online Synchronous';
			ele.data('context_type', 'Online Synchronous');
			ele.css({label: 'Online Synchronous'});
			break;
		case 2:
			ele.addClass('Online_Asynchronous');
			document.getElementById('inputContext').value = 'Online Asynchronous';
			ele.data('context_type', 'Online Asynchronous');
			ele.css({label: 'Online Asynchronous'});
			break;
		case 3:
			ele.addClass('Experiential');
			document.getElementById('inputContext').value = 'Experiential';
			ele.data('context_type', 'Experiential');
			ele.css({label: 'Experiential'});
			break;
	}
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
	cy.remove("");
	cy.center();
}

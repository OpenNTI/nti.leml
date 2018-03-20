function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev, id) {
	ev.dataTransfer.setData("text", id);
}

function drop(ev) {
	ev.preventDefault();

	var data = ev.dataTransfer.getData("text");
	var el_h = ev['toElement']['offsetHeight'];
	var el_w = ev['toElement']['offsetWidth'];
	var ca_h = cy.extent()['h'];
	var ca_w = cy.extent()['w'];
	var x_coord = cy.extent()['x1'] + ((ev.x/el_w) * ca_w);
	var y_coord = cy.extent()['y1'] + ((ev.y/el_h) * ca_h);

	addBuildingBlockToCanvas(data, x_coord, y_coord);
}

function doubleClick(ev, data) {
	addBuildingBlockToCanvas(data);
}

function addBuildingBlockToCanvas(data, x_coord, y_coord) {
	if (x_coord === undefined) {
		x_coord = 0;
	}

	if (y_coord === undefined) {
		y_coord = 0;
	}

	ensureNewIdIsUnique()

	if (data.includes("Context")) {
		var ct = data.replace("Context", "");
		var context = {id: STATE.canvas.new_unique_id, context_type: ct.replace("_", " "), building_blocks: [], actions: [], notations: []};
		var new_node = cy.add([{group: "nodes", data: context, position: {x: x_coord, y: y_coord}, style: {label: context.context_type}, classes: ct + " context"}]);
	} else if (data.includes("startstop")) {
		cy.add({group: "nodes", data: {id: STATE.canvas.new_unique_id, start: true}, position: {x: x_coord, y: y_coord}, style: {label: "Start", class: "startstop"}, classes: "startstop"});
	} else if (data.includes("favorite_")) {
		addFavoriteToCanvas(data.split('_')[1]);
	} else if (data.includes("objective")) {
		let description = "{Enter a description}";
		cy.add({group: "nodes", data: {id: STATE.canvas.new_unique_id, description: description}, position: {x: x_coord, y: y_coord}, style: {label: description}, classes: "notation"});
	} else {
		let description = "{Enter a description}";
		let method = "{Enter a method}"
		var buildingBlock = {id: STATE.canvas.new_unique_id, method: method, description: description, block_type: data};
		var new_node = cy.add([{group: "nodes", data: buildingBlock, position: {x: x_coord, y: y_coord}, style: {label: description + " \n\n\n\n " + method}, classes: "buildingBlock " + data}]);
	}

	cy.resize();

	incrementNewId();
}

function addFavoriteToCanvas(lem_id) {
  setCurrentPage({page:pageEnum.CANVAS});
  var lem = STATE.favoriteLems.dict[lem_id];
  var json = {"lem": lem};
  renderLem(json);
  redraw();
}

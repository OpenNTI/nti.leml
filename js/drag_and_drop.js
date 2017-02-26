var new_id = 100;
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
    if (data.includes("Context")) {
        var ct = data.replace("Context", "");
        var context = {id: new_id, context_type: ct.replace("_", " "), building_blocks: [], actions: [], notations: []};
        var new_node = cy.add([{group: "nodes", data: context, position: {x: x_coord, y: y_coord}, style: {
            label: context.context_type}, classes: ct + " context"
        }]);
    } else if (data.includes("startstop")) {
        cy.add({group: "nodes", data: {id: new_id}, style: {class: "startstop"}, classes: "startstop"});
    } else if (data.includes("exampleLems")) {
			loadLocalLem(data);
		} else {
    	var description = "{Enter a description}";
    	var buildingBlock = {id: new_id, method: "", description: description, block_type: data};
        var new_node = cy.add([{group: "nodes", data: buildingBlock, position: {x: x_coord, y: y_coord}, style: {label: data + " \n\n\n\n " + description}, classes: "buildingBlock " + data}]);
    }
    cy.resize();
    new_id = new_id + 1;
}

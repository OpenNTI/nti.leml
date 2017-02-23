var new_id = 100;
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev, test) {
    ev.dataTransfer.setData("text", test);
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
    var description = "test";
    var buildingBlock = {id: new_id, method: data, description: description, type: properCase(data.split(" ")[0])};
    var new_node = cy.add([{group: "nodes", data: buildingBlock, position: {x: x_coord, y: y_coord}, style: {label: data + " \n\n\n\n " + "test"}, classes: "buildingBlock " + data}]);
    cy.resize();
    new_id = new_id + 1;
}

function properCase(val) {
	var letters = val.split("");
	letters[0] = letters[0].toUpperCase();
	return letters.join("");
}
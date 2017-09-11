function generateJson() {
  var lem = {contexts: [], building_blocks: [], notations: [], actions: []};

  var elements = cy.json().elements;
  var edges = elements.edges;
  var nodes = elements.nodes;

  if (edges) {
    edges.map(function(edge) {
        if (edge.data.description === undefined) {
          edge.data.description = "";
        }

        lem.actions.push(edge.data);
    });
  }

  if (nodes) {
    nodes.map(function(node) {
      if (node.classes.includes("context")) {
          lem.contexts.push(node.data);
      } else if (node.classes.includes("buildingBlock")) {
          lem.building_blocks.push(node.data);
      } else if (node.classes.includes("notation")) {
          var buildingBlockID = cy.$("#"+node.data.id).outgoers()[1].id();
          node.data.building_block = buildingBlockID;
          lem.notations.push(node.data);
      }
    });
  }

  var json = {lem: lem};

  return json;
}

function downloadLemJson() {
  var error = checkLemStructure();

  if (error.length > 0) {
    $("#exportErrorDescription").text(error);
    $("#exportInvalidLEM").modal('show');
    return;
  }

  var author_node = cy.remove('.authorship');

  var lemJson = generateJson();

  if (validateLem(lemJson)) {
    var content = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lemJson));

    var downloadLink = $('#downloadLink')[0];
    downloadLink.setAttribute('href', content);

    var fileName = 'model.lem';
    downloadLink.setAttribute('download', fileName);

    downloadLink.click();
  } else {
    console.error('JSON not valid for LEM schema');
    console.log(ajv.errors);
    console.log(lemJson);
  }

  cy.add(author_node);
}

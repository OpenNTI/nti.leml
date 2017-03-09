function generateJson() {
  var lem = {contexts: [], building_blocks: [], notations: [], actions: [], startIDs: [], stopIDs: []};

  var elements = cy.json().elements;
  var edges = elements.edges;
  var nodes = elements.nodes;

  if (edges) {
    edges.map(function(edge) {
      var id = edge.data.id;
      var source = cy.$("#" + id).source();
      var target = cy.$("#" + id).target();
      var startStopNotation = false;

      if (source.hasClass("startstop") || source.hasClass("notation")) {
        startStopNotation = true;
      }

      if (target.hasClass("startstop")) {
        startStopNotation = true;
      }

      if (!startStopNotation) {
        convertIdToInt(edge.data);
        lem.actions.push(edge.data);
      }
    });
  }

  if (nodes) {
    nodes.map(function(node) {
      if (node.classes.includes("context")) {
          convertIdToInt(node.data);
          lem.contexts.push(node.data);
      } else if (node.classes.includes("startstop")) {
        var id = node.data.id;

        if (node.data.start) {
          cy.$("#" + id).outgoers().map(function(element) {
            if (element.hasClass("buildingBlock")) {
              var numericID = element.id() * 1
              lem.startIDs.push(numericID);
            }
          });
        } else {
          cy.$("#" + id).incomers().map(function(element) {
            if (element.hasClass("buildingBlock")) {
              var numericID = element.id() * 1
              lem.stopIDs.push(numericID);
            }
          });
        }
      } else if (node.classes.includes("buildingBlock")) {
          convertIdToInt(node.data);
          lem.building_blocks.push(node.data);
      } else if (node.classes.includes("notation")) {
          var buildingBlockID = cy.$("#"+node.data.id).outgoers()[1].id();
          var buildingBlockIDNumeric = buildingBlockID * 1;

          convertIdToInt(node.data);
          node.data.building_block = buildingBlockIDNumeric;

          lem.notations.push(node.data);
      }
    });
  }

  var json = {lem: lem};

  return json;
}

function convertIdToInt(object) {
  if (!object.id) {
    console.error("Object passed to convertIdToInt did not have id");
  } else {
    object.id = object.id * 1;
  }

  if (object.source) {
    object.source = object.source * 1;
  }

  if (object.target) {
    object.target = object.target * 1;
  }
}

function downloadLemJson() {
  var error = checkLemStructure();

  if (error.length > 0) {
    showError(error);
    return;
  }

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
}

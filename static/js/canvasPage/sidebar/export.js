const START_ID = "start";
const START_NUM = -1111;
const STOP_ID = "stop";
const STOP_NUM = -2222;

function convertAlphabetStartAndStopToNumber(data) {
  if (data.source === START_ID) {
    data.source = START_NUM;
  }

  if (data.target === STOP_ID) {
    data.target = STOP_NUM;
  }

  return data;
}

function generateJson() {
  var lem = {contexts: [], building_blocks: [], notations: [], actions: []};

  var elements = cy.json().elements;
  var edges = elements.edges;
  var nodes = elements.nodes;

  if (edges) {
    edges.map(function(edge) {
        edge.data = convertAlphabetStartAndStopToNumber(edge.data);
        lem.actions.push(edge.data);
    });
  }

  if (nodes) {
    nodes.map(function(node) {
      if (node.classes.includes("context")) {
          convertIdToInt(node.data);
          lem.contexts.push(node.data);
      } else if (node.classes.includes("buildingBlock")) {
          convertIdToInt(node.data);
          lem.building_blocks.push(node.data);
      } else if (node.classes.includes("notation")) {
          //console.log(node);
          var buildingBlockID = cy.$("#"+node.data.id).outgoers()[1].id();
          var buildingBlockIDNumeric = buildingBlockID * 1;

          //convertIdToInt(node.data);
          node.data.building_block = buildingBlockIDNumeric;
          node.data.id = STATE.canvas.new_unique_id;
          incrementNewId();

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

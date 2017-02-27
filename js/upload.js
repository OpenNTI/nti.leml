// Prepare JSON Schema validation
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validateLem = function(schema) { console.error("Schema could not be loaded!")};

$.getJSON("../lemSchema.json", function(schema) {
  validateLem = ajv.compile(schema);
});

// Set up file input button
const ImageType = {
  JPEG: '.jpeg',
  PNG: '.png'
};

$(function() {
  $("#fileOpener").change(loadFile);
  $("#fileOpener").on('click', function() {this.value = null;});

  $("#downloadPNG").on('click', function() {
     downloadImage(ImageType.PNG);
  });

  $("#downloadJPEG").on('click', function() {
    downloadImage(ImageType.JPEG);
  });
});

function downloadImage(fileType) {
  var content;

  if (fileType == ImageType.JPEG) {
    content = cy.jpeg();
  } else if (fileType == ImageType.PNG) {
    content = cy.png();
  } else {
    console.err("Invalid image type");
  }

  var downloadLink = $('#downloadLink')[0];
  downloadLink.setAttribute('href', content);

  var fileName = 'lem' + fileType;
  downloadLink.setAttribute('download', fileName);

  var imgTag = $('#downloadImage')[0];
  imgTag.setAttribute('src', content);

  downloadLink.click();
}

function downloadLemJson() {
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

function importLem() {
  $("#fileOpener").click();
}

function loadLocalLem(fileName) {
  $.getJSON(fileName, function(lem) {
    renderLem(lem);
  });
}

// Set up LEM JSON file processing
function loadFile() {
  // adapted from http://stackoverflow.com/a/21446426/6004931
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileOpener');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }
}

function receivedText(e) {
  lines = e.target.result;
  var lemJson = JSON.parse(lines);

  if (validateLem(lemJson)) {
    renderLem(lemJson);
  } else {
    console.error('JSON not valid for LEM schema');
    console.log(ajv.errors);
  }
}

function renderLem(json) {
  // Build cytoscape elements here
  var elements = [];

  // Get lem parts
  var buildingBlocks = json.lem.building_blocks;
  var startIDs = json.lem.startIDs;
  var stopIDs = json.lem.stopIDs;
  var actions = json.lem.actions;
  var contexts = json.lem.contexts;
  var notations = json.lem.notations;

  // Start dots
  if (startIDs) {
    for (var index in startIDs) {
      var startID = startIDs[index];
      var startNodeID = "start" + startID;

      elements.push({data: {id: startNodeID, start: true}, style: {label:"Start", class:"startstop"}, classes: 'startstop'},
        {data: {id: startNodeID + startID, source: startNodeID, target: startID}}
      );
    }
  }

  // Contexts
  if (contexts) {
    for (var index in contexts) {
      var context = contexts[index];

      var styleClass = context.context_type.replace(" ", "_");

      var classes = styleClass + " context";

      // Set data to context because context already includes 'id' and all other info
      elements.push({data: context, style: {label: context.context_type}, classes: classes});

      // Adds parent tags to items within this context
      for (var index in context.building_blocks) {
        var buildingBlockID = context.building_blocks[index];
        var buildingBlock = buildingBlocks.filter(function (bb) { return bb.id == buildingBlockID;})[0];
        buildingBlock.parent = context.id;
      }

      for (var index in context.notations) {
        var notationID = context.notations[index];
        var notation = notations.filter(function (n) { return n.building_block == notationID;})[0];
        notation.parent = context.id;
      }
    }
  }

  // Building Blocks
  if (buildingBlocks) {
    for (var index in buildingBlocks) {
      var buildingBlock = buildingBlocks[index];

      var styleClass = buildingBlock.block_type.replace(" ", "_");

      var classes = styleClass + " buildingBlock";

      // Set data to buildingBlock because contbuildingBlockext already includes 'id', 'parent', and all other info
      elements.push({data: buildingBlock, style: {label:buildingBlock.description + " \n\n\n\n " + buildingBlock.method}, classes: classes});
    }
  }

  // Stop dots
  if (stopIDs) {
    for (var index in stopIDs) {
      var stopID = stopIDs[index];
      var stopNodeID = "stop" + stopID;

      elements.push({data: {id: stopNodeID, start: false}, style: {label:"Stop"}, classes: "startstop"},
        {data: {id: stopNodeID + stopID, source: stopID, target: stopNodeID}}
      );
    }
  }

  // Actions
  if (actions) {
    for (var index in actions) {
      action = actions[index];

      var styleClass = action.action_type.replace(" ", "_");

      // Set data to action because action already includes 'id', 'source', 'target', and all other info
      elements.push({data: action, classes: styleClass});
    }
  }

  // Notations
  if (notations) {
    for (var index in notations) {
      var notation = notations[index];
      var notationID = "object" + notation.building_block;

      // Set data to notation because notation already includes 'id', 'parent, and all other info
      console.log(notation);
      elements.push({data: notation, style: {label: notation.description}, classes: "notation"},
        {data: {id: "objectivelink" + notation.id, source: notation.id, target: notation.building_block}, classes: 'notationEdge'}
      );
    }
  }

  console.log(elements);

  loadNewCytoscapeWith(elements);
}

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
          var buildingBlockID = cy.$("#"+node.data.id).outgoers()[1];
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

$(function() {
    $("#fileOpener").change(loadFile);
    $("#fileOpener").on('click', function() {this.value = null;});
});

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
    // Add one stop node
    elements.push({data: {id: "start", start: true}, style: {label:"Start", class:"startstop"}, classes: 'startstop'});

    for (var index in startIDs) {
      var startID = startIDs[index];
      var startNodeID = "start" + startID;

      elements.push({data: {id: startNodeID + startID, source: "start", target: startID, action_type: "Learner Action"}, classes: "Learner_Action"});
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
    // Add one stop node
    elements.push({data: {id: "stop", start: false}, style: {label:"Stop"}, classes: "startstop"});

    // Add all arrows to stop node
    for (var index in stopIDs) {
      var stopID = stopIDs[index];
      var stopNodeID = "stop" + stopID;

      elements.push({data: {id: stopNodeID + stopID, source: stopID, target: "stop", action_type: "Learner Action"}, classes: "Learner_Action"});
    }
  }

  // Actions
  if (actions) {
    for (var index in actions) {
      action = actions[index];

      var styleClass = action.action_type.replace(" ", "_");

      // Set data to action because action already includes 'id', 'source', 'target', and all other info
      elements.push({data: action, classes: styleClass, style: {label: action.description}});
    }
  }

  // Notations
  if (notations) {
    for (var index in notations) {
      var notation = notations[index];
      var notationID = "object" + notation.building_block;

      // Set data to notation because notation already includes 'id', 'parent, and all other info
      elements.push({data: notation, style: {label: notation.description}, classes: "notation"},
        {data: {id: "objectivelink" + notation.id, source: notation.id, target: notation.building_block}, classes: 'notationEdge'}
      );
    }
  }

  loadNewCytoscapeWith(elements);
}
// Prepare JSON Schema validation
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validateLem = function(schema) { console.error("Schema could not be loaded!")};

$.getJSON("../lemSchema.json", function(schema) {
  validateLem = ajv.compile(schema);
});

// Set up file input button
$(function() {
  $("#fileOpener").change(loadFile);
  $("#fileOpener").on('click', function() {this.value = null;});
  $("#downloadPNG").on('click', function() {
    var content = cy.png();

    var dl = document.createElement('a');
    dl.setAttribute('href', content);
    dl.setAttribute('download', 'lem.png');

    var imgTag = document.createElement('img');
    imgTag.setAttribute('alt','LEM PNG');
    imgTag.setAttribute('src', content)

    dl.appendChild(imgTag);
    dl.click();
  });
});

function uploadLem() {
  $("#fileOpener").click();
}

// Set up LEM JSON file processing
function loadFile() {
  // from http://stackoverflow.com/a/21446426/6004931
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
    console.log(ajv.errors);
  }
}

function renderLem(json) {
  console.log(json);

  // Build cytoscape elements here
  var elements = [];

  // Get lem parts
  var buildingBlocks = json['lem']['building blocks'];
  var startIDs = json['lem']['startIDs'];
  var stopIDs = json['lem']['stopIDs'];
  var actions = json['lem']['actions'];
  var contexts = json['lem']['contexts'];
  var notations = json['lem']['notations'];

  // Start dots
  if (startIDs) {
    for (var index in startIDs) {
      var startID = startIDs[index];
      var startNodeID = "start" + startID;

      elements.push({data: {id: startNodeID}, style: {label:"Start", class:"startstop"}, classes: 'startstop'},
        {data: {id: startNodeID + startID, source: startNodeID, target: startID}}
      );
    }
  }

  // Contexts
  if (contexts) {
    for (var index in contexts) {
      var context = contexts[index];

      var styleClass;

      switch (context['type']) {
        case "Online Asynchronous":
          styleClass = "onlineasynchronous";
          break;
        case "Online Synchronous":
          styleClass = "onlinesynchronous";
          break;
        case "Classroom":
          styleClass = "classroom";
          break;
        case "Experiential":
          styleClass = "experiential";
          break;
      }

      elements.push({data: {id: context['id']}, style: {label:context['type']}, classes: styleClass});

      // Adds parent tags to items within this context
      for (var index in context['building blocks']) {
        var buildingBlockID = context['building blocks'][index];
        var buildingBlock = buildingBlocks.filter(function (bb) { return bb.id == buildingBlockID;})[0];
        buildingBlock['parent'] = context['id'];
      }

      for (var index in context['notations']) {
        var notationID = context['notations'][index];
        var notation = notations.filter(function (n) { return n['building block'] == notationID;})[0];
        notation['parent'] = context['id'];
      }
    }
  }

  // Building Blocks
  if (buildingBlocks) {
    for (var index in buildingBlocks) {
      var buildingBlock = buildingBlocks[index];

      var styleClass;
      switch (buildingBlock['type']) {
        case "Dialogue":
          styleClass = "dialogue";
          break;
        case "Evidence":
          styleClass = "evidence";
          break;
        case "Feedback":
          styleClass = "feedback";
          break;
        case "Information":
          styleClass = "information";
          break;
        case "Practice":
          styleClass = "practice";
          break;
      }

      elements.push({data: {id: buildingBlock['id'], parent: buildingBlock['parent']}, style: {label:buildingBlock['type'] + " || " + buildingBlock['description']}, classes: styleClass});
    }
  }

  // Stop dots
  if (stopIDs) {
    for (var index in stopIDs) {
      var stopID = stopIDs[index];
      var stopNodeID = "stop" + stopID;

      elements.push({data: {id: stopNodeID}, style: {label:"Stop", class:"startstop"}, classes: 'startstop'},
        {data: {id: stopNodeID + stopID, source: stopID, target: stopNodeID}}
      );
    }
  }

  // Actions
  if (actions) {
    for (var index in actions) {
      element = actions[index];
      elements.push({data: {id: element['id'], source: element['from'], target: element['to']}});
    }
  }

  // Notations
  if (notations) {
    for (var index in notations) {
      var notation = notations[index];
      var notationID = "object" + notation['building block'];

      elements.push({data: {id: notationID, parent: notation['parent']}, style: {label: notation['description']}},
        {data: {id: "objectivelink" + notation['id'], source: notationID, target: notation['building block']}}
      );
    }
  }

  console.log(elements);

  loadNewCytoscapeWith(elements);
}

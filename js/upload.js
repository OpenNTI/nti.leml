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

      var classes = styleClass + " context";

      // Set data to context because context already includes 'id' and all other info
      elements.push({data: context, style: {label:context['type']}, classes: classes});

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

      var classes = styleClass + " buildingBlock";

      // Set data to buildingBlock because contbuildingBlockext already includes 'id', 'parent', and all other info
      elements.push({data: buildingBlock, style: {label:buildingBlock['type'] + " \n\n\n\n " + buildingBlock['description']}, classes: classes});
    }
  }

  // Stop dots
  if (stopIDs) {
    for (var index in stopIDs) {
      var stopID = stopIDs[index];
      var stopNodeID = "stop" + stopID;

      elements.push({data: {id: stopNodeID}, style: {label:"Stop"}, classes: "startstop"},
        {data: {id: stopNodeID + stopID, source: stopID, target: stopNodeID}}
      );
    }
  }

  // Actions
  if (actions) {
    for (var index in actions) {
      action = actions[index];

      var styleClass;
      switch(action['type']) {
        case "Learner Action":
          styleClass = "learnerAction";
          break;
        case "Facilitator Action":
          styleClass = "facilitatorAction";
          break;
        case "System Action":
          styleClass = "systemAction";
          break;
      }

      // Set data to action because action already includes 'id', 'source', 'target', and all other info
      elements.push({data: action, classes: styleClass});
    }
  }

  // Notations
  if (notations) {
    for (var index in notations) {
      var notation = notations[index];
      var notationID = "object" + notation['building block'];

      // Set data to notation because notation already includes 'id', 'parent, and all other info
      elements.push({data: notation, style: {label: notation['description']}},
        {data: {id: "objectivelink" + notation['id'], source: notation['id'], target: notation['building block']}}
      );
    }
  }

  console.log(elements);

  loadNewCytoscapeWith(elements);
}

<!-- from http://stackoverflow.com/a/21446426/6004931 -->
function loadFile() {
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
  renderLem(lemJson);
}

var position = {x:0, y:0};
const columns = 5;
const xPadding = 300;
const yPadding = 100;

function uploadLem() {
  $("#fileOpener").change(loadFile);
  $("#fileOpener").click();
}

function renderLem(json) {
  console.log(json);

  var elements = [];

  var buildingBlocks = json['lem']['building blocks'];
  var startIDs = json['lem']['startIDs'];
  var stopIDs = json['lem']['stopIDs'];
  var actions = json['lem']['actions'];
  var contexts = json['lem']['contexts'];

  // Start dots
  for (var index in startIDs) {
    var startID = startIDs[index];
    var startNodeID = "start" + startID;

    elements.push({data: {id: startNodeID}, style: {label:"Start", class:"startstop"}},
      {data: {id: startNodeID + startID, source: startNodeID, target: startID}}
    );
  }

  // Contexts
  var context;
  for (var index in contexts) {
    context = contexts[index];
    elements.push({data: {id: context['id']}, style: {label:context['type']}});

    var buildingBlock;
    for (var index in context['building blocks']) {
      buildingBlock = buildingBlocks[index];
      buildingBlock.parent = context['id'];
    }
  }

  // Building Blocks
  var buildingBlock;
  for (var index in buildingBlocks) {
    buildingBlock = buildingBlocks[index];
    elements.push({data: {id: buildingBlock['id'], parent: buildingBlock['parent']}, style: {label:buildingBlock['type'] + " " + buildingBlock['description']}});
  }

  // Stop dots
  for (var index in stopIDs) {
    var stopID = stopIDs[index];
    var stopNodeID = "stop" + stopID;

    elements.push({data: {id: stopNodeID}, style: {label:"Stop", class:"startstop"}},
      {data: {id: stopNodeID + stopID, source: stopID, target: stopNodeID}}
    );
  }

  // Actions
  for (var index in actions) {
    element = actions[index];
    elements.push({data: {id: element['id'], source: element['from'], target: element['to']}});
  }

  console.log(elements);

  loadNewCytoscapeWith(elements);

  // Add styling classes

  for (var index in startIDs) {
    var startNodeID = "start" + startID;
    cy.$("#" + startNodeID).addClass('startstop');
  }

  for (var index in stopIDs) {
    var stopNodeID = "stop" + stopID;
    cy.$("#" + stopNodeID).addClass('startstop');
  }

}

function getNextPosition() {
  var newPosition = {x: position.x, y: position.y};

  if (position.x < xPadding * columns) {
    position.x += xPadding
  } else {
    position.x  = 0;
    position.y += yPadding;
  }

  return newPosition;
}

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

  // Remove all nodes
  cy.remove("node");

  buildingBlocks = json['lem']['building blocks'];

  var nextPosition = getNextPosition();

  var element;
  for (index in buildingBlocks) {
    nextPosition = getNextPosition();
    element = buildingBlocks[index];
    console.log(element)
    cy.add({group: "nodes", data: {id: element['id']}, style: {label:element['type'] + " " + element['description']}, position: nextPosition});
  }

  var startIDs = json['lem']['startIDs'];
  nextPosition = {x:0, y:0};

  for (index in startIDs) {
    var startID = startIDs[index];
    var startNodeID = "start" + startID;

    cy.add({group: "nodes", data: {id: startNodeID}, style: {label:"Start"}, position: nextPosition});
    nextPosition = {x: 0, y: nextPosition.y + 100};
    
    cy.add({group: "edges", data: {id: startNodeID + startID, source: startNodeID, target: startID}})
  }

  actions = json['lem']['actions'];
  for (index in actions) {
    element = actions[index];
    cy.add({group: "edges", data: {id: element['id'], source: element['from'], target: element['to']}})
  }

  cy.fit();
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

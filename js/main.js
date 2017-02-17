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

  function receivedText(e) {
    lines = e.target.result;
    var newArr = JSON.parse(lines);
    console.log(newArr);
  }
}

var position = {x:0, y:0};

function uploadLem() {
  $("#fileOpener").change(loadFile);
  $("#fileOpener").click();
}

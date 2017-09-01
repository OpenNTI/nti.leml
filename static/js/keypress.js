document.addEventListener('keydown', function(event) {
        if (event.key === "Shift") {
          shiftPressed();
        }
    }, false);

document.addEventListener('keyup', function(event) {
        if (event.key === "Shift") {
          shiftReleased();
        }
    }, false);

document.addEventListener('keydown', function(event) {
        if (event.key === "Backspace") {
          backspacePressed();
        }
    }, false);

document.addEventListener('keyup', function(event) {
        if (event.key === "Backspace") {
          backspaceReleased();
        }
    }, false);

document.addEventListener('keydown', function(event) {
        if (event.key === "Delete") {
          deletePressed();
        }
    }, false);

document.addEventListener('keyup', function(event) {
        if (event.key === "Delete") {
          deleteReleased();
        }
    }, false);

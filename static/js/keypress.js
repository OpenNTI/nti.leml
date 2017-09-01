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
          removeSelectedNodes();
        }
    }, false);

document.addEventListener('keydown', function(event) {
        if (event.key === "Delete") {
          removeSelectedNodes();
        }
    }, false);

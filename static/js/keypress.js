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
        let canvasHasFocus =  document.activeElement.id === "canvas_input";
        if (canvasHasFocus && (event.key === "Backspace" || event.key === "Delete")) {
          removeSelectedElements();
        }
    }, false);

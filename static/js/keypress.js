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
        let inputHasFocus =  document.activeElement instanceof HTMLInputElement;
        if (!inputHasFocus && (event.key === "Backspace" || event.key === "Delete")) {
          removeSelectedElements();
        }
    }, false);

document.addEventListener('keydown', function(event) {
        if (event.key === "Shift") {
          STATE.keyboard.shiftPressed = true;
        }
    }, false);

document.addEventListener('keyup', function(event) {
        if (event.key === "Shift") {
          STATE.keyboard.shiftPressed = false;
        }
    }, false);

var GLOBAL_SHIFT_PRESSED = false;

document.addEventListener('keydown', function(event) {
        if (event.key === "Shift") {
          GLOBAL_SHIFT_PRESSED = true;
        }
    }, false);

document.addEventListener('keyup', function(event) {
        if (event.key === "Shift") {
          GLOBAL_SHIFT_PRESSED = false;
        }
    }, false);

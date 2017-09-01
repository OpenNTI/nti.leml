function keyboardReduce(action, name) {
    reduce(function(prevState) {
      let prevKeyboardState = prevState.keyboard;
      return {
        ...prevState,
        keyboard: action(prevKeyboardState)
      }
    },
    name
  );
}

function shiftPressed() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        shiftPressed: true
      }
    },
    "Shift Pressed"
  );
}

function shiftReleased() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        shiftPressed: false
      }
    },
   "Shift Released"
  );
}

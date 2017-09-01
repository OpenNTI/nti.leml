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


function deletePressed() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        deletePressed: true
      }
    },
    "Delete Pressed"
  );
}

function deleteReleased() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        deletePressed: false
      }
    },
   "Delete Released"
  );
}

function backspacePressed() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        backspacePressed: true
      }
    },
    "Backspace Pressed"
  );
}

function backspaceReleased() {
  keyboardReduce(function(prevKeyboardState) {
      return {
        ...prevKeyboardState,
        backspacePressed: false
      }
    },
   "Backspace Released"
  );
}

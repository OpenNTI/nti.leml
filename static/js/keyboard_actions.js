function keyboardReduce(action) {
  reduce(function(prevState) {
    let prevKeyboardState = prevState.keyboard;
    return {
      ...prevState,
      keyboard: action(prevKeyboardState)
    }
  });
}

function shiftPressed() {
  keyboardReduce(function(prevKeyboardState) {
    return {
      ...prevKeyboardState,
      shiftPressed: true
    }
  })
}

function shiftReleased() {
  keyboardReduce(function(prevKeyboardState) {
    return {
      ...prevKeyboardState,
      shiftPressed: false
    }
  })
}

function keyboardSelector(state) {
  return state.keyboard;
}
let keyboardReduce = reducerCreator(keyboardSelector, "keyboard");
let keyboardActionCreator = createReducerSpecificActionCreator(keyboardReduce);

function shiftPressedAction(prevKeyboardState) {
  return {
    ...prevKeyboardState,
    shiftPressed: true
  }
}
let shiftPressed = keyboardActionCreator("Shift pressed", shiftPressedAction);


function shiftReleasedAction(prevKeyboardState) {
  return {
    ...prevKeyboardState,
    shiftPressed: false
  }
}
let shiftReleased = keyboardActionCreator("Shift released", shiftReleasedAction);

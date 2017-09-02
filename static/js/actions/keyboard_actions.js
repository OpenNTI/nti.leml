function keyboardSelector(state) {
  return state.keyboard;
}
let keyboardReduce = reducerCreator(keyboardSelector);
let keyboardActionCreator = createReducerSpecificActionCreator(keyboardReduce);

function shiftPressedAction() {
  return {
    ...prevKeyboardState,
    shiftPressed: true
  }
}
let shiftPressed = keyboardActionCreator("Shift pressed", shiftPressedAction);


function shiftReleasedAction() {
  return {
    ...prevKeyboardState,
    shiftReleased: true
  }
}
let shiftReleased = keyboardActionCreator("Shift released", shiftReleasedAction);

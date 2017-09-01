var STATE = {
  keyboard: {
    shiftPressed: false
  }
};

function reduce(action) {
  STATE = action(STATE);
}

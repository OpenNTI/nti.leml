var STATE = {
  keyboard: {
    shiftPressed: false
  }
};

function reduce(action) {
  console.log(STATE);
  STATE = action(STATE);
  console.log(STATE);
}

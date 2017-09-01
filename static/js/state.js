var STATE = {
  keyboard: {
    shiftPressed: false,
    deletePressed: false,
    backspacePressed: false
  }
};

function reduce(action, name) {
  console.log("Prev state: ", STATE);
  console.log("Action: ", name)
  STATE = action(STATE);
  console.log("Next state: ", STATE);
}

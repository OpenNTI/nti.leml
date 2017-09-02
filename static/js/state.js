var STATE = {
  keyboard: {
    shiftPressed: false,
  },
  canvas: {
    new_unique_id: 0,
    selectedId: null,
  }
};

function reduce(action, name) {
  console.log("Prev state: ", STATE);
  console.log("Action: ", name)
  STATE = action(STATE);
  console.log("Next state: ", STATE);
}

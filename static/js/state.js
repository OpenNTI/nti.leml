var STATE = {
  currentPage: 'canvas',
  currentUsername: undefined,
  keyboard: {
    shiftPressed: false,
  },
  canvas: {
    new_unique_id: 0,
    selectedId: null,
  },
  publicLems: {
    dict: {}
  },
  privateLems: {
    dict: {}
  },
  favoriteLems: {
    dict: {}
  },
  debug: true
};

function reduce(action, name) {
  if (STATE.debug) {
    console.log("Prev state: ", STATE);
    console.log("Action: ", name)
  }
  STATE = action(STATE);
  if (STATE.debug) {
    console.log("Next state: ", STATE);
  }
}

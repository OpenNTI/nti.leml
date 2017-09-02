const sidebarEnum = {
  DEFAULT: "default",
  BLOCK: "block",
  ACTION: "action",
  CONTEXT: "context",
  OBJECTIVE: "objective",
  STARTSTOP: "startstop"
};

var STATE = {
  currentPage: 'canvas',
  currentUsername: undefined,
  currentSidebar: sidebarEnum.DEFAULT,
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

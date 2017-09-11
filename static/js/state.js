const LOG_ACTIONS = true;

const sidebarEnum = {
  DEFAULT: "default",
  BLOCK: "block",
  ACTION: "action",
  CONTEXT: "context",
  OBJECTIVE: "objective",
  STARTSTOP: "startstop"
};

const loginEnum = {
  NOT_LOGGED_IN: "not logged in",
  LOGGING_IN: "logging in",
  FAILED_TO_LOGIN: "failed to login",
  LOGGED_IN: "logged in",
};

var STATE = {
  currentPage: 'canvas',
  currentUsername: undefined,
  currentSidebar: sidebarEnum.DEFAULT,
  login: {
    username: undefined,
    status: loginEnum.NOT_LOGGED_IN
  },
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
  }
};

function reduce(action, name) {
  if (LOG_ACTIONS) {
    console.log("Prev state: ", STATE);
    console.log("Action: ", name)
  }
  STATE = action(STATE);
  if (LOG_ACTIONS) {
    console.log("Next state: ", STATE);
    console.log("--------------------End Action")
  }
}

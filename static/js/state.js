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

function reduce(action, name, params) {
  if (LOG_ACTIONS) {
    console.log("%c Prev state: ", "color:#4cd359", STATE);
    console.log("%c Action: ", "color:#7c786d", name, params);
  }
  STATE = action(STATE, params);
  if (LOG_ACTIONS) {
    console.log("%c Next state: ", "color:#4286f4", STATE);
  }
}

function reducerCreator(selector) {
  return function(action, name, params) {
    reduce(function(prevState, params) {
      let prevSelectedState = selector(prevState);
      return {
        ...prevState,
        canvas: action(prevSelectedState, params)
      }
    },
    name,
    params
  );
}
}

function actionCreator(reducer, name, action) {
  return function(params) {
    reducer(function(prevState, params) {
      return action(prevState, params);
    },
    name,
    params
  );
  }
}

function createReducerSpecificActionCreator(reducer) {
  return function(name, action) {
    return actionCreator(reducer, name, action);
  }
}

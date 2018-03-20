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

const dataRequestEnum = {
  NOT_REQUESTED: "not requested",
  WAITING: "waiting",
  SUCCESS: "success",
  FAILURE: "failure"
};

const pageEnum = {
  CANVAS: "canvas",
  PUBLIC: "public",
  USER: "user",
};

var STATE = {
  currentPage: pageEnum.CANVAS,
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
    dict: {},
    status: dataRequestEnum.NOT_REQUESTED,
    searchText: ""
  },
  privateLems: {
    dict: {},
    status: dataRequestEnum.NOT_REQUESTED,
    searchText: null
  },
  favoriteLems: {
    dict: {}
  }
};

function reduce(action, name, params) {
  if (LOG_ACTIONS) {
    console.log("%c Prev state: ", "color:#2fa833", STATE);
    console.log("%c Action: ", "color:#c9a33a", name, params);
  }
  STATE = action(STATE, params);
  if (LOG_ACTIONS) {
    console.log("%c Next state: ", "color:#2327af", STATE);
  }
}

function reducerCreator(selector, subStateName) {
  return function(action, name, params) {
    reduce(function(prevState, params) {
      let prevSelectedState = selector(prevState);
      return {
        ...prevState,
        [subStateName]: action(prevSelectedState, params)
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

function loginSelector(state) {
  return state.login;
}
let loginReduce = reducerCreator(loginSelector);
let loginActionCreator = createReducerSpecificActionCreator(loginReduce);

function setUsernameAction(prevLoginState, params) {
  return {
    ...prevLoginState,
    username: params.username
  }
}
let setUsername = loginActionCreator("Set Username", setUsernameAction);

function setLoginStateAction(prevLoginState, params) {
  let username = prevLoginState.username;

  if (params.state === loginEnum.LOGGED_IN) {
    username = params.username;
  } else if (params.state === loginEnum.NOT_LOGGED_IN){
    username = undefined;
  }

  return {
    ...prevLoginState,
    username: username,
    status: params.state
  }
}
let setLoginState = loginActionCreator("Set Login State", setLoginStateAction);

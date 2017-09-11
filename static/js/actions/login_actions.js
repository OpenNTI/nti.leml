function loginReduce(action, name) {
    reduce(function(prevState) {
      let prevLoginState = prevState.login;
      return {
        ...prevState,
        login: action(prevLoginState)
      }
    },
    name
  );
}

function setUsername(params) {
  loginReduce(function(prevLoginState) {
      return {
        ...prevLoginState,
        username: params.username
      }
    },
  "Set Username"
  );
}

function setLoginState(params) {
  loginReduce(function(prevLoginState) {
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

    },
  "Set Login State"
  );
}

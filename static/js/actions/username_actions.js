function loginReduce(action, name) {
    reduce(function(prevState) {
      let prevLoginState = prevState.login;
      return {
        ...prevState,
        login: action(prevloginState)
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

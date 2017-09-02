function setUsername(params) {
  reduce(function(prevState) {
      return {
        ...prevState,
        currentUsername: params.page
      }
    },
  "Set Username"
  );
}

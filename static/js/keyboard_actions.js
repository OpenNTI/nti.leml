function shiftPressed() {
  reduce(function(prevState) {
    return {
      ...prevState,
      keyboard: {
        ...prevState.keyboard,
        shiftPressed: true
      }
    }
  });
}

function setSidebar(params) {
  reduce(function(prevState, params) {
      return {
        ...prevState,
        currentSidebar: params.sidebar
      }
    },
  "Set Current Sidebar",
  params
  );
}

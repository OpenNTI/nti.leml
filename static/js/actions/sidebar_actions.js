function setSidebar(params) {
  reduce(function(prevState) {
      return {
        ...prevState,
        currentSidebar: params.sidebar
      }
    },
  "Set Current Sidebar"
  );
}

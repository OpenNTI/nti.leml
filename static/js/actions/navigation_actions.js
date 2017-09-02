function setCurrentPage(params) {
  reduce(function(prevState, params) {
      return {
        ...prevState,
        currentPage: params.page
      }
    },
  "Set Current Page",
  params
  );
}

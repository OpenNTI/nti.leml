function setCurrentPage(params) {
  reduce(function(prevState) {
      return {
        ...prevState,
        currentPage: params.page
      }
    },
  "Set Current Page"
  );
}

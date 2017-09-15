function showPage(page) {
  setCurrentPage({page: page});
}

function setCurrentPage(params) {
  updateUIToShowNewPage(params.page);

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

function updateUIToShowNewPage(page) {
  if (page == pageEnum.CANVAS) {
    // Show
    $('#main_window').removeClass('hidden');
    $('#canvas_button').addClass('active');

    // Hide
    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');

    if (STATE.login.username) {
      $('#userLemList').addClass('hidden');
      $('#user_button').removeClass('active');
    }
  } else if (page == pageEnum.PUBLIC) {

    // Show
    $('#publicLemList').removeClass('hidden');
    $('#public_button').addClass('active');

    // Hide
    $('#main_window').addClass('hidden');
    $('#canvas_button').removeClass('active');

    if (STATE.login.username) {
      $('#userLemList').addClass('hidden');
      $('#user_button').removeClass('active');
    }
  } else if (page == pageEnum.USER) {

    // Show
    if (STATE.login.username) {
      $('#userLemList').removeClass('hidden');
      $('#user_button').addClass('active');
    }

    // Hide
    $('#main_window').addClass('hidden');
    $('#canvas_button').removeClass('active');

    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');


  } else {
    console.log("Invalid page: " + page + " requested")
  }
}

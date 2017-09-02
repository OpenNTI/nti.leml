function showPage(page) {
  if (page == 'canvas') {
    setCurrentPage({page: page});

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
  } else if (page == 'public') {
    setCurrentPage({page: page});

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
  } else if (page == 'user') {
    setCurrentPage({page: page});

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

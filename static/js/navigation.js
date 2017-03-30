function showPage(page) {
  if (page == 'canvas') {
    // Show
    $('#main_window').removeClass('hidden');
    $('#canvas_button').addClass('active');

    // Hide
    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');

    $('#userLemList').addClass('hidden');
    $('#user_button').removeClass('active');
  } else if (page == 'public') {
    // Show
    $('#publicLemList').removeClass('hidden');
    $('#public_button').addClass('active');

    // Hide
    $('#main_window').addClass('hidden');
    $('#canvas_button').removeClass('active');

    $('#userLemList').addClass('hidden');
    $('#user_button').removeClass('active');
  } else if (page == 'user') {
    // Show
    $('#userLemList').removeClass('hidden');
    $('#user_button').addClass('active');

    // Hide
    $('#main_window').addClass('hidden');
    $('#canvas_button').removeClass('active');

    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');


  } else {
    console.log("Invalid page: " + page + " requested")
  }
}

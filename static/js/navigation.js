var loggedIn = false;
var globalPage = 'canvas';

function showPage(page) {
  if (page == 'canvas') {
    globalPage = page;

    // Show
    $('#main_window').removeClass('hidden');
    $('#canvas_button').addClass('active');

    // Hide
    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');

    if (loggedIn) {
      $('#userLemList').addClass('hidden');
      $('#user_button').removeClass('active');
    }
  } else if (page == 'public') {
    globalPage = page;

    // Show
    $('#publicLemList').removeClass('hidden');
    $('#public_button').addClass('active');

    // Hide
    $('#main_window').addClass('hidden');
    $('#canvas_button').removeClass('active');

    if (loggedIn) {
      $('#userLemList').addClass('hidden');
      $('#user_button').removeClass('active');
    }
  } else if (page == 'user') {
    globalPage = page;

    // Show
    if (loggedIn) {
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

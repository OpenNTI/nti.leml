var username = undefined;
var globalPage = 'canvas';

$(function() {
  $.get(currentuserRoute, function(data, status) {
    var userJson = JSON.parse(data);

    if (userJson.username) {
      username = userJson.username;
      loginState('loggedIn');
    }
  });
});

function showPage(page) {
  if (page == 'canvas') {
    globalPage = page;

    // Show
    $('#main_window').removeClass('hidden');
    $('#canvas_button').addClass('active');

    // Hide
    $('#publicLemList').addClass('hidden');
    $('#public_button').removeClass('active');

    if (username) {
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

    if (username) {
      $('#userLemList').addClass('hidden');
      $('#user_button').removeClass('active');
    }
  } else if (page == 'user') {
    globalPage = page;

    // Show
    if (username) {
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

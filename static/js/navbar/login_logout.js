$(function() {
  $("#shareNavBar").hide();

  $("#logoutButton").on('click', function() {
    logout();
  });
  $("#loginButton").on('click', function(e) {
    e.preventDefault();

    setLoginState({state: loginEnum.LOGGING_IN});
    updateLoginUI();

    login($("#usernameField").val(), $("#passwordField").val());

    $("#usernameField").val("");
    $("#passwordField").val("");
  });
  $("#usernameField").change(resetStateLogin);
  $("#passwordField").change(resetStateLogin)

});

function updateLoginUI() {
  switch (STATE.login.status) {
    case loginEnum.LOGGING_IN:
      $("#usernameField")[0].disabled = true;
      $("#passwordField")[0].disabled = true;
      $("#loginButton")[0].disabled = true;
      $("#loginButton").html('<span class="glyphicon glyphicon-refresh spinning"></span> Loading...');
      $("#registerButton").hide();
      break;
    case loginEnum.NOT_LOGGED_IN:
      $("#usernameField")[0].disabled = false;
      $("#passwordField")[0].disabled = false;
      $("#loginButton")[0].disabled = false;
      $("#loginButton").html('Login');
      $("#registerButton").show();
      break;
    case loginEnum.LOGGED_IN:
      $("#shareDropdown").show();
      $("#saveDropdown").show();

      $("#user_button").show();

      $("#loginForm").hide();
      $("#currentUserEmail").empty();
      $("#currentUserEmail").append(STATE.login.username);
      $("#currentUserInfo").show();

      requestPrivateLems();
      break;
    case loginEnum.FAILED_TO_LOGIN:
      $("#usernameField")[0].disabled = false;
      $("#passwordField")[0].disabled = false;
      $("#loginButton")[0].disabled = false;
      $("#loginButton").html('Login');
      $("#registerButton").show();

      $("#loginErrorText").empty();
      $("#loginErrorText").append("Failed to login");
      $("#loginErrorText").show();
      break;
    default:
      console.error("Invalid login state: " + state);
      setLoginState({state: loginEnum.NOT_LOGGED_IN});
      break;
  }

}

function resetStateLogin() {
  $("#usernameField").removeClass("invalid");
  $("#passwordField").removeClass("invalid");
  $("#loginErrorText").hide();
  $("#loginButton").html("Login");
}

function login(email, password) {
  var loginInfo = {};

  loginInfo.email = email;
  loginInfo.pass = password;

  $.post(loginRoute, JSON.stringify(loginInfo), function(data, status){
    setLoginState({state: loginEnum.NOT_LOGGED_IN});
    updateLoginUI();

    if (data === "User not found") {
      $("#usernameField").addClass("invalid");

      $("#loginErrorText").empty();
      $("#loginErrorText").append(data);
      $("#loginErrorText").show();
    } else if (data === "Invalid username or password") {
      $("#usernameField").addClass("invalid");
      $("#passwordField").addClass("invalid");

      $("#loginErrorText").empty();
      $("#loginErrorText").append(data);
      $("#loginErrorText").show();
    } else if (status == "success") {
      setLoginState({
        state: loginEnum.LOGGED_IN,
        username: loginInfo.email
      });
      updateLoginUI();

      resetLocalFavoritesList(requestPublicLems, requestPrivateLems, loadFavoriteTemplates);
    }
  }).error(function() {
    setLoginState({
      state: loginEnum.FAILED_TO_LOGIN
    });
    updateLoginUI();
  });
}

function logout() {
  $.post(logoutRoute, function(data, status){
    if (status == "success") {
      setUsername({username: undefined});
      resetLocalFavoritesList(requestPublicLems, loadFavoriteTemplates);

      if (STATE.currentPage == pageEnum.USER) {
        setCurrentPage({page:pageEnum.CANVAS});
      }

      $("#shareDropdown").hide();
      $("#saveDropdown").hide();
      $("#user_button").hide();

      $("#currentUserInfo").hide();
      $("#currentUserEmail").empty();
      $("#loginForm").show();
    } else {
      alert("Logout failed");
    }
  }).error(function() {
    alert("Failed to login");
  });
}

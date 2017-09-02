$(function() {
  $.get(currentuserRoute, function(data, status) {
    var userJson = JSON.parse(data);

    if (userJson.email) {
      setLoginState({
        state: loginEnum.LOGGED_IN,
        username: userJson.email,
      });
    } else {
      setLoginState({
        state: loginEnum.NOT_LOGGED_IN,
      });
    }

    updateLoginUI();
  });

  resetLocalFavoritesList(loadPublicLEMs, loadUserLEMs, loadFavoriteTemplates);
});

function resetLocalFavoritesList() {
  var topArgs = arguments;

  $.get(favoriteRoute, function(data, status) {
    var lemStringList = JSON.parse(data);

    var newList = [];
    var newLemList = [];

    for (var lemIndex in lemStringList) {
      var lem = JSON.parse(lemStringList[lemIndex]);
      var lemID = lem._id.$oid;
      newLemList[lemID] = lem;
    }

    setFavoriteLemsDict({favoriteLemsDict: newLemList});

    // Call all callbacks
    for (var i = 0; i < topArgs.length; i++) {
      topArgs[i]();
    }
  }).error(function () {
    setFavoriteLemsDict({favoriteLemsDict: {}});

    // Call all callbacks
    for (var i = 0; i < topArgs.length; i++) {
      topArgs[i]();
    }
  });
}

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

      loadUserLEMs();
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

      resetLocalFavoritesList(loadPublicLEMs, loadUserLEMs, loadFavoriteTemplates);
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
      resetLocalFavoritesList(loadPublicLEMs, loadFavoriteTemplates);

      if (STATE.currentPage == 'user') {
        showPage('canvas');
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

function saveLem() {
  exportLem(false);
}

function shareLem() {
  exportLem(true);
}

function exportLem(public) {
  var lemName = $("#lemNameText")[0].value;
  var lem = generateJson().lem;
  lem.name = lemName;

  if (public) {
    lem.public = 1;
  } else {
    lem.public = 0;
  }

  // Save thumbnail
  lem.thumbnail = cy.png();

  $.post(lemRoute, JSON.stringify(lem), function(data, status){

      // alert("Data: " + data + "\nStatus: " + status);
  });
}

function openExportDialog(share) {
  var error = checkLemStructure();

  if (error.length > 0) {
    $("#exportErrorDescription").text(error);
    $("#exportInvalidLEM").modal('show');
    return;
  }

  // Clear name field
  $("#lemNameText")[0].value = "";

  if (share) {
    setupExportModal("Share LEM", "Share", shareLem);
  } else {
    setupExportModal("Save LEM", "Save", saveLem);
  }

  $("#shareLEM").modal('show');
}

function setupExportModal(title, submitName, submitAction) {
  $("#exportSubmitButton").unbind('click');
  $("#exportSubmitButton").on('click', submitAction);
  $("#exportSubmitButton").text(submitName);
  $("#exportModalTitle").text(title);
}

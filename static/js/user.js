var globalUsername = undefined;
var STATE.currentPage = 'canvas';

$(function() {
  $.get(currentuserRoute, function(data, status) {
    var userJson = JSON.parse(data);

    if (userJson.email) {
      globalUsername = userJson.email;
      loginState('loggedIn');
    } else {
      globalUsername = undefined;
      loginState('ready');
    }
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

    loginState('loading');

    login($("#usernameField").val(), $("#passwordField").val());

    $("#usernameField").val("");
    $("#passwordField").val("");
  });
  $("#usernameField").change(resetStateLogin);
  $("#passwordField").change(resetStateLogin)

});

function loginState(state) {
  switch (state) {
    case "loading":
      $("#usernameField")[0].disabled = true;
      $("#passwordField")[0].disabled = true;
      $("#loginButton")[0].disabled = true;
      $("#loginButton").html('<span class="glyphicon glyphicon-refresh spinning"></span> Loading...');
      $("#registerButton").hide();
      break;
    case "ready":
      $("#usernameField")[0].disabled = false;
      $("#passwordField")[0].disabled = false;
      $("#loginButton")[0].disabled = false;
      $("#loginButton").html('Login');
      $("#registerButton").show();
      break;
    case "loggedIn":
      $("#shareDropdown").show();
      $("#saveDropdown").show();

      $("#user_button").show();

      $("#loginForm").hide();
      $("#currentUserEmail").empty();
      $("#currentUserEmail").append(globalUsername);
      $("#currentUserInfo").show();

      loadUserLEMs();
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
    loginState('ready');

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
      globalUsername = loginInfo.email;
      resetLocalFavoritesList(loadPublicLEMs, loadUserLEMs, loadFavoriteTemplates);

      loginState('loggedIn');
    }
  }).error(function() {
    alert("Failed to login");
  });
}

function logout() {
  $.post(logoutRoute, function(data, status){
    if (status == "success") {
      globalUsername = undefined;
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

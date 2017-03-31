$(function() {
  $("#shareNavBar").hide();

  $("#shareButton").on('click', function() {
    shareLem();
  });
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
  $("#registerSubmitButton").on('click', function() {
    register($("#registerEmail").val(), $("#registerPassword").val());

    $("#registerEmail").empty();
    $("#registerPassword").empty();
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
  }

}

function resetStateLogin() {
  $("#usernameField").removeClass("invalid");
  $("#passwordField").removeClass("invalid");
  $("#loginErrorText").hide();
  $("#loginButton").html("Login");
}

function register(email, password) {
  var registerInfo = {};

  registerInfo.email = email;
  registerInfo.pass = password;

  $.post(registerRoute, JSON.stringify(registerInfo), function(data, status){
    if (data == "Complete") {
      $("#registerModal").modal('hide');
      login(email, password);
    } else {
      alert(data + "\n" + status)
    }
  });
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
      $("#shareNavBar").show();

      $("#loginForm").hide();
      $("#currentUserEmail").empty();
      $("#currentUserEmail").append(loginInfo.email);
      $("#currentUserInfo").show();
    }
  });
}

function logout() {
  $.post(logoutRoute, function(data, status){
    if (status == "success") {
      $("#shareNavBar").hide();

      $("#currentUserInfo").hide();
      $("#currentUserEmail").empty();
      $("#loginForm").show();
    } else {
      alert("Logout failed");
    }
  });
}

function shareLem() {
  // TODO check if logged in

  var lemName = $("#lemNameText")[0].value;
  var lem = generateJson().lem;
  lem.name = lemName;

  // Save thumbnail
  lem.thumbnail = cy.png();
  $.post("http://localhost:5000/lem", JSON.stringify(lem), function(data, status){
      // alert("Data: " + data + "\nStatus: " + status);
  });
}

function openShareDialog() {
  // Clear name field
  $("#lemNameText")[0].value = "";
  $("#shareLEM").modal('show');
}

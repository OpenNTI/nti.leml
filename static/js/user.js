var email;

$(function() {
  $("#shareButton").on('click', function() {
    shareLem();
  });
  $("#logoutButton").on('click', function() {
    logout();
  });
  $("#loginButton").on('click', function() {
    login($("#usernameField")[0].value, $("#passwordField")[0].value);

    $("#usernameField").empty();
    $("#passwordField").empty();
  });
  $("#registerSubmitButton").on('click', function() {
    register($("#registerEmail")[0].value, $("#registerPassword")[0].value);

    $("#registerEmail").empty();
    $("#registerPassword").empty();
  });
  $("#usernameField").change(resetStateLogin);
  $("#passwordField").change(resetStateLogin)

});

function resetStateLogin() {
  $("#usernameField").removeClass("invalid");
  $("#passwordField").removeClass("invalid");
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
    if (data === "User not found") {
      $("#usernameField").addClass("invalid");
    } else if (data === "Invalid username or password") {
      $("#usernameField").addClass("invalid");
      $("#passwordField").addClass("invalid");
    } else if (status == "success") {
      $("#loginForm").hide();
      $("#currentUserEmail").empty();
      $("#currentUserEmail").append(loginInfo.email);
      $("#currentUserInfo").show();
    }
  });
}

function logout() {
  $.post(logoutRoute, function(data, status){
    if (data == "Logged out") {
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

  console.log(lem);

  $.post(saveRoute, JSON.stringify(lem), function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
  });
}

function openShareDialog() {
  // Clear name field
  $("#lemNameText")[0].value = "";
  $("#shareLEM").modal('show');
}

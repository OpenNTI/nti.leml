$(function() {
  $("#shareButton").on('click', function() {
    shareLem();
  });
  $("#loginButton").on('click', function() {
    var loginInfo = {};

    loginInfo.email = $("#usernameField")[0].value;
    loginInfo.pass = $("#passwordField")[0].value;

    $.post(loginRoute, JSON.stringify(loginInfo), function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
  });
});

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

function setupRegisterModal() {
  $("#registerForm").unbind('keydown');
  $("#registerForm").on('keydown', function(evt) {
    if (evt.key === "Enter" || evt.key === "Return") {
      registerSubmitClicked();
    }
  });
}

function registerSubmitClicked() {
  register($("#registerEmail").val(), $("#registerPassword").val());

  $("#registerEmail").empty();
  $("#registerPassword").empty();
}

function register(email, password) {
  var registerInfo = {};

  registerInfo.email = email;
  registerInfo.pass = password;

  $.post(registerRoute, JSON.stringify(registerInfo), function(data, status){
		$("#registerModal").modal('hide');
		login(email, password);
  }).error(function(data) {
		var responseText = data.responseText
		var startIndexErrorDesc = data.responseText.lastIndexOf("(") + 1;
		var endIndexErrorDesc = data.responseText.lastIndexOf(")");
		var lengthErrorDesc = endIndexErrorDesc - startIndexErrorDesc;

    var errorDesc;
    if (lengthErrorDesc > 0) {
		  errorDesc = responseText.substr(startIndexErrorDesc, lengthErrorDesc);
    } else {
      errorDesc = responseText;
    }

		alert("Failed to register:\n" + errorDesc);
	});
}

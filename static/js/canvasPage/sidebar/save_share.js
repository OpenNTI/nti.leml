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
      requestPublicLems();
      requestPrivateLems();
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

  $("#lemNameText").unbind('keydown');
  $("#lemNameText").on('keydown', function(event) {
    if (event.key === "Enter" || event.key === "Return") {
      $("#exportSubmitButton").click();
    }
  });

  $("#exportSubmitButton").text(submitName);
  $("#exportModalTitle").text(title);
}

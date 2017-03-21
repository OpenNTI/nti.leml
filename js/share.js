$(function() {
  $("#shareButton").on('click', function() {
    shareLem();
  });
});

function shareLem() {
  var lemName = $("#lemNameText")[0].value;
  var lem = generateJson().lem;
  lem.name = lemName;

  // TODO Hardcoded because it's the only user right now
  lem.created_by = "austingpgraham@gmail.com";


  $.post(saveRoute, lem, function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
  });
}

function openShareDialog() {
  // Clear name field
  $("#lemNameText")[0].value = "";
  $("#shareLEM").modal('show');
}

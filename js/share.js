$(function() {
  $("#shareButton").on('click', function() {
    shareLem();
  });
});

function shareLem() {
  // TODO check if logged in

  var lemName = $("#lemNameText")[0].value;
  var lem = generateJson().lem;
  lem.name = lemName;

  console.log(lem);

  $.post(saveRoute, lem, function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
  });
}

function openShareDialog() {
  // Clear name field
  $("#lemNameText")[0].value = "";
  $("#shareLEM").modal('show');
}

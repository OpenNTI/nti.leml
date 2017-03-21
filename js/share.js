$(function() {
  $("#shareButton").on('click', function() {
    shareLem();
  });
});

function shareLem() {
  var lemName = $("#lemNameText")[0].value;
  var lem = generateJson();
  lem.name = lemName;

  console.log(lem);
}

function openShareDialog() {
  $("#shareLEM").modal('show');
}

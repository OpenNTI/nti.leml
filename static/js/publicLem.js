$(function() {
  $.get(lemallRoute, function(data, status) {
    var lems = JSON.parse(data);

    var lemSection = $("#lemList");

    var lemDivs = "";
    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);

      lemDivs += generateLemRow("../static/img/templates/absorbDoConnect.png", lem.created_by);
    }

    lemSection.html(lemDivs);
  })
})

function generateLemRow(imgURL, username) {
  return '<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail"><img src=' + imgURL + '><div class="caption"><h3>Absorb Do Connect</h3><p>Created by @'+ username + '</p><p><a href="#" class="btn btn-primary" role="button">Add to Canvas</a></p></div></div></div></div>'
}

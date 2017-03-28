$(function() {
  $.get(lemallRoute, function(data, status) {
    var lems = JSON.parse(data);

    var lemSection = $("#lemList");
    console.log(lems);
    var lemDivs = "";
    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);

      var imgURL = lem.thumbnail;
      var id = lem._id.$oid;

      // default img
      if (!imgURL) {
        imgURL = "../static/img/templates/absorbDoConnect.png";
      }

      lemDivs += generateLemRow(lem.name, lem.created_by, imgURL, id);
    }

    lemSection.html('<div class="row">' + lemDivs + '</div>');
  })
})

function generateLemRow(title, username, imgURL, id) {
  return '<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src=' + imgURL + '><div id="' + id + '" class="caption"><h3>' + title + '</h3><p>Created by @'+ username + '</p><p><a href="#" class="btn btn-primary" role="button" onclick="dosomething(this.parentElement.parentElement);">Add to Canvas</a></p></div></div></div>';
}

function dosomething(test) {
  var t = $.get("http://localhost:5000/lem", {"id": test.id});
  console.log(t);
}
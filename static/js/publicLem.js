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
        imgURL = "../static/img/templates/no_thumbnail.png";
      }

      lemDivs += generateLemRow(lem.name, lem.created_by, imgURL, id);
    }

    lemSection.html('<div class="row">' + lemDivs + '</div>');
  })
})

function generateLemRow(title, username, imgURL, id) {
  const header = '<h3>' + title + '</h3>';
  const createdBy = '<p>Created by @'+ username + '</p>';
  const addToCanvas = '<p><a href="#" class="btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a></p>';

  const thumbnail = '<img src=' + imgURL + '>';
  const caption = '<div id="' + id + '" class="caption">' + header + createdBy + addToCanvas + '</div>';

  return '<div class="col-sm-6 col-md-4"> <div class="thumbnail">' + thumbnail + caption + '</div> </div>';
}

function addToCanvas(test) {
  togglePublic(0);
  $.get("http://localhost:5000/lem", {"id": test.id}, function(data, status) {
    var lem = JSON.parse('{"lem": ' + data + '}');
    console.log(lem);
    renderLem(lem);
  });
  redraw();
  //console.log(t);
  //renderLem(t.responseText);
}

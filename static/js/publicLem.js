$(function() {
  $.get(lemallRoute, function(data, status) {
    var lems = JSON.parse(data);

    var lemSection = $("#publicLemList");
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

      lemDivs += generateLemRow(lem.name, lem.created_by, imgURL, id, false);
    }
    var str_test = '<div class="row"><div class="col-lg-6"><div class="input-group"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="searchLems();">Search</button></span><input id="search_field" type="text" class="form-control" placeholder="Search for..."></div><!-- /input-group --></div><!-- /.col-lg-6 --></div>';
    lemSection.html(str_test + '<div class="row">' + lemDivs + '</div>');
  });
})

function generateLemRow(title, username, imgURL, id, showDelete) {
  const header = '<h3>' + title + '</h3>';
  const createdBy = '<p>Created by @'+ username + '</p>';
  const addToCanvas = '<a href="#" class="btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a>';
  const deleteButton = '<a href="#" class="btn btn-danger pull-right" role="button" onclick="deleteLem(this.parentElement.parentElement);">Delete</a>';

  const thumbnail = '<img style="width:300px;height:150px;" src=' + imgURL + '>';
  var caption = '<div id="' + id + '" class="caption">' + header + createdBy + '<p>' + addToCanvas;

  if (showDelete) {
    caption += deleteButton + '</p></div>';
  } else {
    caption += '</p></div>';
  }

  return '<div class="col-sm-6 col-md-4 lems"> <div class="thumbnail">' + thumbnail + caption + '</div> </div>';
}

function addToCanvas(test) {
  showPage('canvas');
  $.get(lemRoute, {"id": test.id}, function(data, status) {
    var lem = JSON.parse('{"lem": ' + data + '}');
    console.log(lem);
    renderLem(lem);
  });
  redraw();
  //console.log(t);
  //renderLem(t.responseText);
}

function searchLems() {

  $(".lems").each(function(){
    console.log($(this).html());
    if($(this).html().toLowerCase().indexOf(searchValue.toLowerCase()) > -1){
     $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');
    }
  });

}

function loadUserLEMs() {
  $.get(lemuserRoute, function(data, status) {
    var lems = JSON.parse(data);

    var lemSection = $("#userLemList");

    var lemDivs = "";
    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);

      var imgURL = lem.thumbnail;
      var id = lem._id.$oid;

      // default img
      if (!imgURL) {
        imgURL = "../static/img/templates/no_thumbnail.png";
      }

      lemDivs += generateLemRow(lem.name, lem.created_by, imgURL, id, true);
    }

    // This search bar searches the public lem page, not user lems
    //var str_test = '<div class="row"><div class="col-lg-6"><div class="input-group"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="searchLems();">Search</button></span><input id="search_field" type="text" class="form-control" placeholder="Search for..."></div><!-- /input-group --></div><!-- /.col-lg-6 --></div>';
    lemSection.html('<div class="row">' + lemDivs + '</div>');
  });
}

function deleteLem(lemJson) {
    var lemBody = {"id": lemJson.id};
    $.delete(lemRoute, JSON.stringify(lemBody), function(data, status) {
      // TODO Remove thumbnail
      // This works from the console, but not here...
      // var id = lemJson.id;
      // $('#'+id).parent().remove();
    });
}

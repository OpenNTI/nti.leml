$(function() {
  loadPublicLEMs();
});

function generateLemRow(title, username, imgURL, id, showDelete) {
  const header = '<h3>' + title + '</h3>';
  const createdBy = '<p>Created by @'+ username + '</p>';
  const addToCanvas = '<a href="#" class="addToCanvas btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a>';
  const favoriteButton = '<a href="#" class="favoriteButton btn btn-warning" role="button" onclick="favoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star-empty"></span> Favorite</a>';
  const deleteButton = '<a href="#" class="deleteButton btn btn-danger pull-right" role="button" onclick="deleteLem(this.parentElement.parentElement);">Delete</a>';

  const onclickShowDetail = "showDetail('" + title + "','" + username + "','" + imgURL + "','" + id + "'," + showDelete + ")";
  const thumbnail = '<img onclick="' + onclickShowDetail + '" style="width:300px;height:150px;" src=' + imgURL + '>';
  var caption = '<div id="' + id + '" class="caption">' + header + createdBy + '<p>' + addToCanvas + '  ' + favoriteButton;

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

function showDetail(title, username, imgURL, id, privateLems) {
  const header = '<h3>' + title + '</h3>';
  const createdBy = '<p>Created by @'+ username + '</p>';
  const addToCanvas = '<a href="#" class="addToCanvas btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a>';
  const favoriteButton = '<a href="#" class="favoriteButton btn btn-warning" role="button" onclick="favoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star-empty"></span> Favorite</a>';
  const deleteButton = '<a href="#" class="deleteButton btn btn-danger pull-right" role="button" onclick="deleteLem(this.parentElement.parentElement);">Delete</a>';

  const onclickShowDetail = "$('#lemDetailModal').modal('show')";
  const thumbnail = '<img onclick="' + onclickShowDetail + '" style="width:50%;margin-left:25%;margin-right:25%;" src=' + imgURL + '>';
  var caption = '<div id="' + id + '" class="caption">' + header + createdBy + '<p>' + addToCanvas + '  ' + favoriteButton;

  if (privateLems) {
    caption += deleteButton + '</p></div>';
  } else {
    caption += '</p></div>';
  }

  const contentHtml =  thumbnail + caption;
  $("div#lemContent").html(contentHtml);

  $("#newCommentForm").attr('lemid', id);

  if (globalUsername) {
    $("#newCommentForm").show()
    $("#loginRequiredToComment").hide()
  } else {
    $("#newCommentForm").hide()
    $("#loginRequiredToComment").show()
  }

  $("ul#commentsList").html("");
  var route = privateLems ? commentRoute : publicCommentRoute;
  $.get(route + "?lem=" + id, function (data, success) {
    var commentsStrings = JSON.parse(data);

    var commentsHtml = "";
    for (var commentIndex in commentsStrings) {
      var comment = JSON.parse(commentsStrings[commentIndex]);
      var date = Date(comment.date_created.$date);

      commentsHtml += generateComment(comment.created_by, date.toString(), comment.text);
    }

    $("ul#commentsList").html(commentsHtml);
  });

  $('#lemDetailModal').modal('show')
}

function searchLems() {
  var searchValue = $("#search_field").val();
  $(".lems").each(function(){
    if($(this).html().toLowerCase().indexOf(searchValue.toLowerCase()) > -1){
     $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');
    }
  });

}

function loadPublicLEMs() {
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

    var refreshButton = '<button class="btn" onclick="loadPublicLEMs();" style="margin-bottom:10px;">Refresh</button>';
    var str_test = '<div class="row"><div class="col-lg-6"><div class="input-group"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="searchLems();">Search</button></span><input id="search_field" type="text" class="form-control" placeholder="Search for..."></div><!-- /input-group --></div><!-- /.col-lg-6 --></div>';
    lemSection.html(refreshButton + str_test + '<div class="row">' + lemDivs + '</div>');
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

    var refreshButton = '<button class="btn" onclick="loadUserLEMs();"style="margin-bottom:10px;">Refresh</button>';

    lemSection.html(refreshButton + '<div class="row">' + lemDivs + '</div>');
  });
}

function deleteLem(lemJson) {
  var lemSection = $("#userLemList");

  var loader = '<div id="userLoader" class="loader"></div>';
  lemSection.html(loader);

    var lemBody = {"id": lemJson.id};
    $.delete(lemRoute, JSON.stringify(lemBody), function(data, status) {
      loadUserLEMs();
      // TODO Remove thumbnail
      // This works from the console, but not here...
      // var id = lemJson.id;
      // $('#'+id).parent().remove();
    });
}

function favoriteLem(lemJson) {
  var favoriteButton = $("#" + lemJson.id).children().children(".favoriteButton");
  favoriteButton.html('<span class="glyphicon glyphicon-star"></span> Unfavorite</a>');
  favoriteButton.attr('onclick', 'unfavoriteLem(this.parentElement.parentElement)');

  $.post(favoriteLem, {"id": lemJson.id}, function(data, status) {

  });
}

function unfavoriteLem(lemJson) {
  var favoriteButton = $("#" + lemJson.id).children().children(".favoriteButton");
  favoriteButton.html('<span class="glyphicon glyphicon-star-empty"></span> Favorite</a>');
  favoriteButton.attr('onclick', 'favoriteLem(this.parentElement.parentElement);');

  $.delete(favoriteLem, {"id": lemJson.id}, function(data, status) {

  });
}

function addComment(){
    var source = event.target;
    const userComment = source.children.namedItem("userComment").value;
    const lemId = source.getAttribute('lemid');

    const postBody = {"lem":lemId, "text": userComment};
    $.post(commentRoute, JSON.stringify(postBody), function(data, status) {
      if (status == "success") {
        const createdComment = JSON.parse(data);
        const date = Date(createdComment.date_created.$date);
        addCommentToList(createdComment.created_by, date, createdComment.text);
        $("#userComment").val("");
      } else {
        console.error("Could not create comment");
      }
    });
}

function addCommentToList(owner, time, message) {
  const newComment = generateComment(owner, time.toString(), message);
  $("#commentsList").prepend(newComment);
}

function generateComment(owner, time, message) {
  return '<strong class="pull-left primary-font">' + owner + '</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + time + '</small></br><li class="ui-state-default">' + message + '</li></br>';
}

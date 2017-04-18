var globalFavoriteIDList = [];
var globalFavoriteLemsList = [];

function createLemDetailHtml(title, username, imgURL, id, rating, showHeader, showDelete, thumbnailClickable) {
  const createdBy = '<p>Created by '+ username + '</p>';
  const addToCanvasButton = '<a  class="addToCanvas btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a>';

  // Set state of favorite button if this lem is favorited by this user or not
  var favoriteButton = '<a lemid=' + id + '  class="favoriteButton btn btn-warning" role="button"';
  if (globalFavoriteIDList.includes(id)) {
    favoriteButton += ' onclick="unfavoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star"></span> Unfavorite</a>';
  } else {
    favoriteButton += ' onclick="favoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star-empty"></span> Favorite</a>';
  }

  var thumbnail = '<img ';
  if (thumbnailClickable) {
    const showLemDetailModalFunctionCall = "showLemDetailModal('" + title + "','" + username + "','" + imgURL + "','" + id + "'," + rating + ","  + showDelete + ")";
    const onclickshowLemDetailModal = 'onclick="' + showLemDetailModalFunctionCall + '" ';
    thumbnail += onclickshowLemDetailModal;
  }
  thumbnail += 'style="width:300px;height:150px;" src=' + imgURL + ' />';

  var caption = '<div id="' + id + '" class="caption">';

  // Optionally show header, given input (lem detail modal has title on top of modal so doesn't need this header)
  if (showHeader) {
    const header = '<h3>' + title + '</h3>';
    caption += header;
  }
  caption += createdBy + '<p>' + addToCanvasButton + '  ' + favoriteButton;

  // Optionally show delete button, given input (show delete for user lems)
  if (showDelete) {
    const deleteButton = '<a  class="deleteButton btn btn-danger pull-right" role="button" onclick="deleteLem(this.parentElement.parentElement);">Delete</a>';
    caption += deleteButton;
  }
  caption += '</p></div>';

  return thumbnail + caption;
}

function generateLemRowHtml(title, username, imgURL, id, rating, showDelete) {
  const lemDetailContentHtml = createLemDetailHtml(title, username, imgURL, id, rating, true, showDelete, true);
  const lemBlockHtml = '<div class="col-sm-6 col-md-4 lems"> <div class="thumbnail">' + lemDetailContentHtml + '</div> </div>'
  return lemBlockHtml;
}

function addToCanvas(lemDetailBlockHtml) {
  showPage('canvas');
  $.get(lemRoute, {"id": lemDetailBlockHtml.id}, function(data, status) {
    var lem = JSON.parse('{"lem": ' + data + '}');
    renderLem(lem);
    redraw();
  });
}

function showLemDetailModal(title, username, imgURL, id, avgRating, privateLems) {
  $("#lemModalTitle").text(title);

  const contentHtml = createLemDetailHtml(title, username, imgURL, id, avgRating, false, privateLems, false);
  $("div#lemContent").html(contentHtml);

  setupRatingStars(avgRating);
  generateCommentSectionHtml(id);

  $('#lemDetailModal').modal('show')
}

function generateCommentSectionHtml(id) {
  // Set form id so comments can be added to correct lems
  $("#newCommentForm").attr('lemid', id);

  if (globalUsername) {
    // Show commenting for if logged in
    $("#newCommentForm").show()
    $("#loginRequiredToComment").hide()
  } else {
    // If not logged in, show message informing user to login for commenting
    $("#newCommentForm").hide()
    $("#loginRequiredToComment").show()
  }

  // Clear comment list and show loading symbol
  $("ul#commentsList").html("");
  $("#commentsLoading").show();

  $.get(commentRoute, {"lem": id}, function (data, success) {
    var commentsStrings = JSON.parse(data);

    // Create new comments html
    var commentsHtml = "";
    for (var commentIndex in commentsStrings) {
      var comment = JSON.parse(commentsStrings[commentIndex]);
      var date = new Date(comment.date_created.$date);

      commentsHtml += generateCommentHtml(comment.created_by, date.toLocaleString(), comment.text);
    }

    // Hide loading symbol and update comments
    $("#commentsLoading").hide();
    $("ul#commentsList").html(commentsHtml);
  }).error(function() {
    // On error, remove loading symbol and show alert
    $("#commentsLoading").hide();
    alert("Could not add comment");
  });
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
    var lemDivs = "";
    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);

      var imgURL = lem.thumbnail;
      var id = lem._id.$oid;

      // default img
      if (!imgURL) {
        imgURL = "../static/img/templates/no_thumbnail.png";
      }

      lemDivs += generateLemRowHtml(lem.name, lem.created_by, imgURL, id, lem.avgRating, false);
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

      lemDivs += generateLemRowHtml(lem.name, lem.created_by, imgURL, id, true);
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
    // Reload lems so that deleted lem is removed
    loadUserLEMs();
  });
}

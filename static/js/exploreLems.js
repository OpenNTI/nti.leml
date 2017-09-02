function createLemDetailHtml(lemID, isPrivate, isModal) {
  var lem;
  if (isPrivate) {
    lem = STATE.privateLems.dict[lemID];
  } else {
    lem = STATE.publicLems.dict[lemID];
  }

  const title = lem.name;
  const username = lem.created_by;
  const imgURL = lem.thumbnail;
  const rating = lem.avgRating;

  const createdBy = '<p>Created by '+ username + '</p>';
  const addToCanvasButton = '<a  class="addToCanvas btn btn-primary" role="button" onclick="addToCanvas(this.parentElement.parentElement);">Add to Canvas</a>';

  // Set state of favorite button if this lem is favorited by this user or not
  var favoriteButton = '<a lemid=' + lemID + '  class="favoriteButton btn btn-warning" role="button"';
  if (Object.keys(STATE.favoriteLems.dict).includes(lemID)) {
    favoriteButton += ' onclick="unfavoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star"></span> Unfavorite</a>';
  } else {
    favoriteButton += ' onclick="favoriteLem(this.parentElement.parentElement);"><span class="glyphicon glyphicon-star-empty"></span> Favorite</a>';
  }

  var thumbnail = '<img ';
  if (!isModal) {
    const showLemDetailModalFunctionCall = "showLemDetailModal('" + lemID + "',"  + isPrivate + ")";
    const onclickshowLemDetailModal = 'onclick="' + showLemDetailModalFunctionCall + '" ';
    thumbnail += onclickshowLemDetailModal;
  }
  thumbnail += 'style="width:300px;height:150px;" src=' + imgURL + ' />';

  var caption = '<div id="' + lemID + '" class="caption">';

  // Optionally show header, given input (lem detail modal has title on top of modal so doesn't need this header)
  if (!isModal) {
    const header = '<h3>' + title + '</h3>';
    caption += header;
  }

  caption += createdBy + '<p>';

  if (isModal) {
    const ratingHtml = '<span id="ratingNumber"></span> <span class="first-star glyphicon glyphicon-star-empty"></span><span class="second-star glyphicon glyphicon-star-empty"></span><span class="third-star glyphicon glyphicon-star-empty"></span><span class="fourth-star glyphicon glyphicon-star-empty"></span><span class="fifth-star glyphicon glyphicon-star-empty"></span>';
    caption += ratingHtml + '<br>';
  }

  caption += addToCanvasButton + '  ' + favoriteButton;

  // Optionally show delete button, given input (show delete for user lems)
  if (isPrivate) {
    const deleteButton = '<a  class="deleteButton btn btn-danger pull-right" role="button" onclick="deleteLem(this.parentElement.parentElement);">Delete</a>';
    caption += deleteButton;
  }
  caption += '</p></div>';

  return thumbnail + caption;
}

function generateLemRowHtml(lemID, isPrivate, isModal) {
  const lemDetailContentHtml = createLemDetailHtml(lemID, isPrivate, isModal);
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

function showLemDetailModal(lemID, isPrivate) {
  var lem;
  if (isPrivate) {
    lem = STATE.privateLems.dict[lemID];
  } else {
    lem = STATE.publicLems.dict[lemID];
  }

  $("#lemModalTitle").text(lem.name);

  const isModal = true;
  const contentHtml = createLemDetailHtml(lemID, isPrivate, isModal);
  $("div#lemContent").html(contentHtml);

  setupRatingStars(lem.avgRating);
  generateCommentSectionHtml(lemID);

  $('#lemDetailModal').modal('show')
}

function generateCommentSectionHtml(id) {
  // Set form id so comments can be added to correct lems
  $("#newCommentForm").attr('lemid', id);

  if (STATE.login.username) {
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

function loadLemsHtml(lems, isPrivate, showSearch) {
  var sectionID;
  if  (isPrivate) {
    sectionID = "userLemList";
  } else {
    sectionID = "publicLemList";
  }

  var lemSection = $("#" + sectionID);

  if (lems.length === 0) {
      let offsetDiv = "<div class='col-md-3'></div>";
      let blackboardGlyphicon = "<span class='glyphicon glyphicon-blackboard' style='font-size: 100px;'/>";
      let callToActionText = "<p class='lead'>No LEMs have been published. Create your own and share it with the world!</p>";
      let callToActionDiv = "<div>" + callToActionText + " </div>";
      let noLemsDiv = "<div class='col-md-6' style='text-align: center; margin-top: 10%;'>" + blackboardGlyphicon + callToActionDiv + "</div>";
      lemSection.html(offsetDiv + noLemsDiv)
  } else {
    var lemDivs = "";
    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);

      var imgURL = lem.thumbnail;
      var id = lem._id.$oid;

      // default img
      if (!imgURL) {
        imgURL = "../static/img/templates/no_thumbnail.png";
      }

      const isModal = false;
      lemDivs += generateLemRowHtml(id, isPrivate, isModal);
    }

    // This search bar searches the public lem page, not user lems
    var str_test = "";
    if (showSearch) {
      str_test = '<div class="row"><div class="col-lg-6"><div class="input-group"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="searchLems();">Search</button></span><input id="search_field" type="text" class="form-control" placeholder="Search for..."></div><!-- /input-group --></div><!-- /.col-lg-6 --></div>';
    }

    var refreshButton = '<button class="btn" onclick="requestPrivateLems();"style="margin-bottom:10px;">Refresh</button>';

    lemSection.html(refreshButton + str_test + '<div class="row">' + lemDivs + '</div>');
  }
}

function deleteLem(lemJson) {
  var lemSection = $("#userLemList");

  var loader = '<div id="userLoader" class="loader"></div>';
  lemSection.html(loader);

  var lemBody = {"id": lemJson.id};
  $.delete(lemRoute, JSON.stringify(lemBody), function(data, status) {
    // Reload lems so that deleted lem is removed
    requestPrivateLems();
  }).error(function(data) {
    alert("Failed to delete. \n " + JSON.stringify(data));
    requestPrivateLems();
  });
}

function favoriteLem(lemJson) {
  var favoriteButtonsForLem = $(".favoriteButton").filter(function(el) { return $(".favoriteButton")[el].getAttribute("lemid") == lemJson.id})
  favoriteButtonsForLem.prop('disabled', true);

  $.put(favoriteRoute + "?id=" + lemJson.id, function(data, status) {

    favoriteButtonsForLem.prop('disabled', false);

    favoriteButtonsForLem.map(function(index) {
      $(favoriteButtonsForLem[index]).html('<span class="glyphicon glyphicon-star"></span> Unfavorite</a>');
      $(favoriteButtonsForLem[index]).attr('onclick', 'unfavoriteLem(this.parentElement.parentElement);');
    });

    var lemStringList = JSON.parse(data);

    var newList = [];
    var newLemList = [];

    for (var lemIndex in lemStringList) {
      var lem = JSON.parse(lemStringList[lemIndex]);
      var lemID = lem._id.$oid;
      newList.push(lemID);
      newLemList.push(lem);
    }

    globalFavoriteLemsList = newLemList;
    favoriteIDList = newList;

    loadFavoriteTemplates();
  }).error(function () {
    alert("You must login to favorite");
  });
}

function unfavoriteLem(lemJson) {
  var favoriteButtonsForLem = $(".favoriteButton").filter(function(el) { return $(".favoriteButton")[el].getAttribute("lemid") == lemJson.id})
  favoriteButtonsForLem.prop('disabled', true);

  $.delete(favoriteRoute + "?id=" + lemJson.id, function(data, status) {
    favoriteButtonsForLem.prop('disabled', false);

    favoriteButtonsForLem.map(function(index) {
      $(favoriteButtonsForLem[index]).html('<span class="glyphicon glyphicon-star-empty"></span> Favorite</a>');
      $(favoriteButtonsForLem[index]).attr('onclick', 'favoriteLem(this.parentElement.parentElement);');
    });

    var lemStringList = JSON.parse(data);

    var newList = [];
    var newLemList = [];

    for (var lemIndex in lemStringList) {
      var lem = JSON.parse(lemStringList[lemIndex]);
      var lemID = lem._id.$oid;
      newList.push(lemID);
      newLemList.push(lem);
    }

    globalFavoriteLemsList = newLemList;
    favoriteIDList = newList;

    loadFavoriteTemplates();
  }).error(function () {
    alert("Failed to unfavorite. Are you logged in?");
  });
}

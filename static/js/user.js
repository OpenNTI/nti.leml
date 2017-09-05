$(function() {
  $.get(currentuserRoute, function(data, status) {
    var userJson = JSON.parse(data);

    if (userJson.email) {
      setLoginState({
        state: loginEnum.LOGGED_IN,
        username: userJson.email,
      });
    } else {
      setLoginState({
        state: loginEnum.NOT_LOGGED_IN,
      });
    }

    updateLoginUI();
  });

  resetLocalFavoritesList(requestPublicLems, requestPrivateLems, loadFavoriteTemplates);
});

function resetLocalFavoritesList() {
  var topArgs = arguments;

  $.get(favoriteRoute, function(data, status) {
    var lemStringList = JSON.parse(data);

    var newList = [];
    var newLemList = [];

    for (var lemIndex in lemStringList) {
      var lem = JSON.parse(lemStringList[lemIndex]);
      var lemID = lem._id.$oid;
      newLemList[lemID] = lem;
    }

    setFavoriteLemsDict({favoriteLemsDict: newLemList});

    // Call all callbacks
    for (var i = 0; i < topArgs.length; i++) {
      topArgs[i]();
    }
  }).error(function () {
    setFavoriteLemsDict({favoriteLemsDict: {}});

    // Call all callbacks
    for (var i = 0; i < topArgs.length; i++) {
      topArgs[i]();
    }
  });
}

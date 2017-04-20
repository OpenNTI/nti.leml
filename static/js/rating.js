function rate(lemJson, rating) {
  const ratingPostBody = {"lem": lemJson.id, "rating": rating};
  $.post(rateRoute, JSON.stringify(ratingPostBody), function (data, status) {
    var response = JSON.parse(data);
    setupRatingStars(response.new_avg);
    if (globalPublicLemsDict[response.lem_id]) {
      globalPublicLemsDict[response.lem_id].avgRating = response.new_avg;
    } else {
      globalPrivateLemsDict[response.lem_id].avgRating = response.new_avg;
    }
  });
}

function setupRatingStars(defaultRating) {
  // Round to one decimal place
  var defaultRating = Math.round(defaultRating * 10) / 10;

  $("#ratingNumber").text(defaultRating);

  setRating(defaultRating);

  $(".first-star").hover(function() {
    setRating(1);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 1);');

  $(".second-star").hover(function() {
    setRating(2);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 2);');

  $(".third-star").hover(function() {
    setRating(3);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 3);');

  $(".fourth-star").hover(function() {
    setRating(4);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 4);');

  $(".fifth-star").hover(function() {
    setRating(5);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 5);');
}

function setRating(rating) {
  unstar("first");
  unstar("second");
  unstar("third");
  unstar("fourth");
  unstar("fifth");

  if (rating > 0.5) {
    star("first");
  }
  if (rating > 1.5) {
    star("second");
  }
  if (rating > 2.5) {
    star("third");
  }
  if (rating > 3.5) {
    star("fourth");
  }
  if (rating > 4.5) {
    star("fifth");
  }
}

function star(number) {
  $("." + number + "-star").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
}

function unstar(number) {
  $("." + number + "-star").removeClass("glyphicon-star").addClass("glyphicon-star-empty");
}

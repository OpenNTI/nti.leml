function rate(lemJson, rating) {
  const ratingPostBody = {"lem": lemJson.id, "rating": rating};
  $.post(rateRoute, JSON.stringify(ratingPostBody), function (data, status) {
    var response = JSON.parse(data);
    setupRatingStars(response.new_avg);
    if (STATE.publicLems.dict[response.lem_id]) {
      setPublicLemRating({lemId: response.lem_id, rating: response.new_avg});
    } else {
      setPrivateLemRating({lemId: response.lem_id, rating: response.new_avg});
    }
  });
}

function setupRatingStars(defaultRating) {
  // Round to one decimal place
  var defaultRating = Math.round(defaultRating * 10) / 10;

  $("#ratingNumber").text(defaultRating);

  setRating(defaultRating);

  $(".first-star").hover(function() {
    setRating(1, true);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 1);');

  $(".second-star").hover(function() {
    setRating(2, true);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 2);');

  $(".third-star").hover(function() {
    setRating(3, true);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 3);');

  $(".fourth-star").hover(function() {
    setRating(4, true);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 4);');

  $(".fifth-star").hover(function() {
    setRating(5, true);
  }, function() {
    setRating(defaultRating);
  }).attr('onclick', 'rate(this.parentElement.parentElement, 5);');
}

function setRating(rating, temporary) {
  unstar("first", temporary);
  unstar("second", temporary);
  unstar("third", temporary);
  unstar("fourth", temporary);
  unstar("fifth", temporary);

  if (rating > 0.5) {
    star("first", temporary);
  }
  if (rating > 1.5) {
    star("second", temporary);
  }
  if (rating > 2.5) {
    star("third", temporary);
  }
  if (rating > 3.5) {
    star("fourth", temporary);
  }
  if (rating > 4.5) {
    star("fifth", temporary);
  }
}

function star(number, temporary) {
  let star = $("." + number + "-star");
  star.removeClass("glyphicon-star-empty").addClass("glyphicon-star");

  if (temporary) {
    star.css('color','gray');
  } else {
    star.css('color', 'black')
  }
}

function unstar(number, temporary) {
  let star = $("." + number + "-star");
  star.removeClass("glyphicon-star").addClass("glyphicon-star-empty");

  if (temporary) {
    star.css('color','gray');
  } else {
    star.css('color', 'black')
  }
}

function togglePublic(i) {
  if (i == 0) {
    $('#main_window').removeClass('hidden');
    $('#lemList').addClass('hidden');
    $('#canvas_button').addClass('active');
    $('#public_button').removeClass('active');
    //document.getElementById("public_button").firstChild.data = "Public LEMs";

  } else {
    $('#main_window').addClass('hidden');
    $('#lemList').removeClass('hidden');
    $('#canvas_button').removeClass('active');
    $('#public_button').addClass('active');
    //document.getElementById("public_button").firstChild.data = "Canvas Editor";
  }
}

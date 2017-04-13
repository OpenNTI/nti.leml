function addComment(){
    var source = event.target;
    const userComment = source.children.namedItem("userComment").value;
    const lemId = source.getAttribute('lemid');

    const postBody = {"lem":lemId, "text": userComment};
    $.post(commentRoute, JSON.stringify(postBody), function(data, status) {
      if (status == "success") {
        const createdComment = JSON.parse(data);
        const date = new Date(createdComment.date_created.$date);
        addCommentToList(createdComment.created_by, date, createdComment.text);
        $("#userComment").val("");
      } else {
        console.error("Could not create comment");
      }
    });
}

function addCommentToList(owner, time, message) {
  const newComment = generateComment(owner, time.toLocaleString(), message);
  $("#commentsList").prepend(newComment);
}

function generateComment(owner, time, message) {
  return '<strong class="pull-left primary-font">' + owner + '</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span> ' + time + '</small></br><li class="ui-state-default">' + message + '</li></br>';
}

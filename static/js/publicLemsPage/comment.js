function addComment(){
    // Only source should be the new comment form in the lem detail modal
    const source = event.target;
    const userComment = source.children.namedItem("userComment").value;
    const lemId = source.getAttribute('lemid');

    const postBody = {"lem":lemId, "text": userComment};
    $.post(commentRoute, JSON.stringify(postBody), function(data, status) {
      const createdComment = JSON.parse(data);
      const dateCreated = new Date(createdComment.date_created.$date);
      addCommentToList(createdComment.created_by, dateCreated, createdComment.text);
      // On success, clear new comment field
      $("#userComment").val("");
    }).error(function() {
      alert("Count not create comment");
    });
}

function addCommentToList(owner, time, message) {
  const newCommentHtml = generateCommentHtml(owner, time.toLocaleString(), message);
  // Adds comment to top of the list (newer comments will be at the top)
  $("#commentsList").prepend(newCommentHtml);
}

function generateCommentHtml(owner, time, message) {
  const commentOwner = '<strong class="pull-left primary-font">' + owner + '</strong>';
  const commentTime = '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span> ' + time + '</small>';
  const commentText = '</br><li class="ui-state-default">' + message + '</li></br>';
  return commentOwner + commentTime + commentText;
}

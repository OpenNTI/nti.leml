// Set up file input button
const ImageType = {
  JPEG: '.jpeg',
  PNG: '.png'
};

$(function() {
  $("#downloadPNG").on('click', function() {
    downloadImage(ImageType.PNG);
  });

  $("#downloadJPEG").on('click', function() {
    downloadImage(ImageType.JPEG);
  });
});

function downloadAnywayClicked() {
  $('#downloadLink')[0].click();
}

function downloadImage(fileType) {
  var content;

  if (fileType == ImageType.JPEG) {
    content = cy.jpeg();
  } else if (fileType == ImageType.PNG) {
    content = cy.png();
  } else {
    console.err("Invalid image type");
  }

  var downloadLink = $('#downloadLink')[0];
  downloadLink.setAttribute('href', content);

  var fileName = 'lem' + fileType;
  downloadLink.setAttribute('download', fileName);

  var imgTag = $('#downloadImage')[0];
  imgTag.setAttribute('src', content);

  var error = checkLemStructure();

  if (error.length > 0) {
    $("#downloadErrorDescription").text(error);
    $("#downloadInvalidLEM").modal('show');
  } else {
    downloadLink.click();
  }
}

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

function downloadImage(fileType) {

  var error = validateLem();

  if (error.length > 0) {
    showError(error);
    return;
  }
  
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

  downloadLink.click();
}

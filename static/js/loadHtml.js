$(function(){
  var includes = $('[data-include]');
  jQuery.each(includes, function(){
    var file = 'static/html/' + $(this).data('include') + '.html';
    $(this).load(file);
  });
});

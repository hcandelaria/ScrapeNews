$( document ).ready(function() {
  $(document).on("click", ".saveArcticle", function() {

    $.ajax({
      method: "POST",
      url: "/news",
      data: {
        title: $(this).siblings('a').children('h4').text(),
        link: $(this).siblings('a').attr('href')
      }
    }).then( function (dbNews,res){
      if (res !== 'success') Materialize.toast('Already saved', 5000, 'rounded red');
      else Materialize.toast('News saved', 3000, 'rounded green');
    });
  });
  $(document).on("click", ".submit-notes", function() {
    $.ajax({
      method: "POST",
      url: "/notes/" + $(this).parent().parent().parent().attr('id'),
      data: {
        title: $(this).parent().parent().siblings().children('form.col').children('div.title').children('input').val().trim(),
        comment: $(this).parent().parent().siblings().children('form.col').children('div.notes').children('textarea').val().trim()
      }
    }).then(function(data) {
    });
  });
  $(document).on('click','.removeNews', function(){
    $(this).parent().parent().fadeOut();
    $.ajax({
    type: 'DELETE',
    url: "/news/" + $(this).parent().parent().attr('id')
  }).then( function (dbNotes,res){
      if (res !== 'success') {
        Materialize.toast('Unknown error try again', 5000, 'rounded red');
      }
      else {
        Materialize.toast('Deleted', 3000, 'rounded red');
      }
    });
  })
});

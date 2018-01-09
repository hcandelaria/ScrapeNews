
$( document ).ready(function() {
  $(document).on("click", ".saveArcticle", function() {

    $.ajax({
      method: "POST",
      url: "/news",
      data: {
        title: $(this).siblings('a').children('h4').text(),
        link: $(this).siblings('a').attr('href')
      }
    }).then(function(data) {
      console.log(data);
    });
  });
});

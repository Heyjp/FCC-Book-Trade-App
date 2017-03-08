$('document').ready(function () {
  // take the search value from search bar
  // Send via ajax request to return a list of books
  // Show the books in a div
  // Book is then clickable and can be submitted to be added to user library
  $('#incoming').hide();
  $('#outgoing').hide();


  $('#b-request').click(function () {
    $('#outgoing').hide();
    $('#incoming').show();
  });

  $('#o-request').click(function () {
    $('#incoming').hide();
    $('#outgoing').show();
  });

  $('#submit-search').click(function (e) {
    e.preventDefault();

    var form = document.getElementById('lib');
    var obj = {};
    obj.title = $('#title').val();
    obj.author = $('#author').val()
    console.log(obj);
    $.post('/search', obj, function (info) {
      $('#placeholder').empty();
      console.log("success");

      info.forEach(function (elem) {
        // Create Img Element
        var card = $('<div/>', {
          class: "col s2 card selector",
          id: "test"
        });
        var cardImage = $('<div/>', {
          class: "card-image"
        });
        var img = $('<img/>', {
          src: elem.image,
        });

        var title = $('<p/>', {
          text: elem.title,
        });

        var cardContent = $('<div/>', {
          class: "card-content"
        });
        var text = $('<p/>', {
          text: " - " + elem.author
        });
        var placeholder = $('#placeholder');

        card.appendTo(placeholder);
        cardImage.appendTo(card);
        img.appendTo(cardImage);
        cardContent.appendTo(cardImage);
        title.appendTo(cardContent);
        text.appendTo(cardContent);

      });

    });
  });


  $('div').on("click", ".selector", function()  {

   $('.selected').removeClass('selected'); // removes the previous selected class
   $(this).addClass('selected'); // adds the class to the clicked image
   console.log($(this).val());
});

  $('#selector').click(function () {
  var obj = {}
  var item =  $('#placeholder').find('.selected');
  var text = item["0"].textContent;
  var img =  item.children().find('img').attr('src');
  obj.title = text;
  obj.img = img;

  $.post('/addbook', obj, function (success) {
      console.log(success);
      location.reload()
    });

  });

 // front page
  $('i.trade-icon').click(function (e) {
    e.preventDefault();
    var book = $(this).attr('id');
    var obj = {};
    obj.id = book;

    $.post('/requestbook', obj, function(data) {
      console.log("request successful");
      location.reload()
    });
  });


// library

  $('i.accept-trade').click(function (e) {
    var parent = $(this).parent();
    e.preventDefault();
    var book = $(this).attr('id');
    var title = $(this).textContent;
    var obj = {};
    obj.id = book;

    $.post('/accept-trade', obj, function (err, success) {
      if (err) {
        console.log(err);
      }
      parent.remove();
      console.log('trade accepted');
    });
  });


  $('i.cancel-request').click(function (e) {
    var parent = $(this).parent();
    e.preventDefault();
    var book = $(this).attr('id');
    var title = $(this).textContent;
    var obj = {};
    obj.id = book;

    $.post('/cancel-request', obj, function (err, success) {
        if (err) {
          console.log(err);
        }
        parent.remove();
        console.log('request cancelled');
    });
  });


  $('i.cancel-trade').click(function (e) {
    var parent = $(this).parent();
    e.preventDefault();
    var book = $(this).attr('id');
    var obj = {};
    obj.id = book;

    $.post('/cancel-request', obj, function (err, success) {
        if (err) {
          console.log(err);
        }
        parent.remove();
        console.log('request cancelled');
    });
  });

});

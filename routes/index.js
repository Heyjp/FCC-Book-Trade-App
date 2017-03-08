var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

var Trade = require('../config/trader.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.user) {
    var user = req.user.username;
    Trade.booksAvailable(user, function (err, info) {
      if (err) {
        console.log(err);
      }
      res.render("child", {data: info});
    });
  } else {
    Trade.booksAvailable(null, function (err, info) {
      if (err) {
        console.log(err);
      }
        res.render('child', { title: 'Express', data: info });
    });
  }
});

router.get('/login', function (req, res) {
  res.render('login');
})

router.get('/library', function(req, res, next) {
    if (req.user) {
      var user = req.user.username;

      Trade.showLibrary(user, function (err, doc) {
        var show_library = doc;
        if (err) {
          console.error(err);
        }
          Trade.findIncTrades(user, function (err, trades) {
            var incTrades = trades;
            if (err) {
              console.error(err);
            }
              Trade.findOutTrades(user, function (err, requests) {
                var outTrades = requests;
                if (err) {
                  console.error(err);
                }
                  res.render('library', { title: 'Express', books: show_library , inc: outTrades, out: incTrades });
              });
          });
      });
    } else {
      res.render('library', { title: 'Express'});
    }
  });

router.get('/trade', function (req, res) {
  res.render('trade');
})


router.post('/addbook', function (req, res) {

  var data = req.body;
  var user = req.user.username;

  Trade.addBook(user, data, function (err, info) {
    if (err) {
    }
    res.status(200).send("successRedirect");
  });

});

router.get('/register', function (req, res) {
  res.render('register');
})

router.post('/login', passport.authenticate('local-login', { successRedirect: '/library',
                                                    failureRedirect: '/login' }));

router.post('/register', passport.authenticate('local-signup', { successRedirect: '/library',
                                                                failureRedirect: '/login' }));



router.post('/search', function (req, res) {
  var data = req.body;
  console.log(data);
  var url = "https://www.googleapis.com/books/v1/volumes?q="

  if (data.author) {
    url = url + data.title + "inauthor" + data.author
  } else {
    url = url + data.title
  }

  request(url, function (error, response, body) {
    if (error) {
      console.log(err);
    } else if (!error && response.statusCode == 200) {
    //  console.log(body)
      var json = JSON.parse(body);
      var list = createBookList(json);
      res.send(list);
    }
  })

});

router.post('/requestbook', function (req, res) {
  var data = req.body;
  var user = req.user.username;

  Trade.requestTrade(user, data, function (err, success) {
    if (err) {
      console.log(err);
    }
    res.send("successfully requested");
  })
});


router.post('/accept-trade', function(req, res) {
  var data = req.body;
  var user = req.user.username;
  data.cancel = false;
  Trade.handleTradeRequest(data, user, function (err, success) {
    if (err) {
      console.log(err);
    }
    res.status(200).send("accepted trade");
  });
});

router.post('/cancel-trade', function(req, res) {
  var data = req.body;
  var user = req.user.username;
  data.cancel = true;

  Trade.handleTradeRequest(data, user, function (err, success) {
    if (err) {
      console.log(err);
    }
    res.status(200).send("cancelled trade");
  });
});

router.post('/cancel-request', function(req, res) {
  var data = req.body;
  var user = req.user.username;

  Trade.cancelBookRequest(user, data, function (err, success){
      if (err) {
        console.log(err);
      }
      res.status(200).send("cancelled request")
  })
});

module.exports = router;


function createBookList (list) {
  var newArray = [];
  list.items.forEach(function(ele) {
    var obj = {};

    if (obj.image) {
      obj.image = ele.volumeInfo.imageLinks.thumbnail;
    } else {
      obj.image = "http://www.themagickalcat.com/v/vspfiles/photos/BBBUB5-2T.jpg";
    }

    obj.title = ele.volumeInfo.title;
    obj.author = ele.volumeInfo.authors;
    newArray.push(obj);
  })
  return newArray;
}

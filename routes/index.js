var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

var Trade = require('../config/trader.js');
var jwt = require ('jsonwebtoken')



/* GET home page. */
router.get('/', function(req, res, next) {
/*
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
*/

  res.render('index')
});
/*
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


router.post('/api/accept-trade', function(req, res) {
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
*/

// get a collection of all the books in the database
router.get('/api/books', function (req, res) {
    Trade.booksAvailable(null, function (err, info) {
      if (err) {
        console.log(err, "there is an");
      }
      console.log("no user")
      res.status(200).send(info);
    });
});

// Get the users personal library
router.get('/api/show-library', function (req, res) {
  let user = req.query.user
  Trade.showLibrary(user, function (err, info) {
    if (err) {
      console.log(err, "there is an");
    }
    console.log("user")
    res.status(200).send(info);
  });
});


router.post('/api/request-book', function (req, res) {
  let data = req.body;
  Trade.requestTrade(data, function (err, success) {
    if (err) {
    console.log(err);
    return res.status(400).send(err);
  } else if (!success) {
    return res.status(400).send("You already have that book");
  }

    return res.send("successfully requested");
  })

});

router.post('/api/accept-trade', function(req, res) {

  let data = req.body;
  data.cancel = false;
  let user = req.query.user;

  Trade.handleTradeRequest(data, user, function (err, success) {
    if (err) {
    return   console.log(err);
    }
    console.log(success, "this is success");
    return  res.status(200).send("accepted trade");
  });

});

router.post('/api/login', function (req, res, next) {
  console.log("login route post", req.body);

  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      console.log(err, "this is err in api/sig")
      return res.status(200).send(false)
     }
    if (!user) {
      console.log("user does not exist")
      return   res.status(200).send(false)
    }
    req.session.user = user.username;
    let sig = jwt.sign({id: user.username}, process.env.JWT_KEY);
    res.status(200)
    .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
    .send(user.username)
  })(req, res, next);

});

router.post('/api/signup', function (req, res, next) {
  console.log("signup route post", req.body);

  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      console.log(err, "this is err in api/sig")
      return res.status(200).send(false)
     }
    if (!user) {
      console.log("user does not exist")
      return res.status(200).send(false)
    }
    req.session.user = user.username;
    let sig = jwt.sign({id: user.username}, process.env.JWT_KEY);
    return res.status(200)
    .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
    .send(user.username);
  })(req, res, next);
});

router.get('/api/get-trades', function (req, res) {
    let user = req.query.user

    Trade.findIncTrades(user, function (err, trades) {
      var incTrades = trades;
      if (err) {
        return console.error(err);
      }

      Trade.findOutTrades(user, function (err, requests) {
        var outTrades = requests;
        if (err) {
        return  console.error(err);
        }
        return  res.status(200).send({inc: incTrades, out: outTrades});
      });
    });
});

router.post('/api/book-search', function (req, res) {

  const title = req.body.title;
  const author = req.body.author;
  let googleUrl = "https://www.googleapis.com/books/v1/volumes?q="

  // Filters results depending on whether a title or author is submitted
  if (!author) {
    googleUrl += title;
  } else {
    googleUrl += title + "+inauthor:" + author;
  }

  // Google API request
  request(googleUrl, function (error, response, body) {
    if (error) {
      console.log(err);
    } else if (!error && response.statusCode == 200) {
       // Take googlebooks data and parse it for use
       let bookResults = JSON.parse(body);

       // if the search comes up with no items send false response to user
       if (bookResults.totalItems === 0) {
         console.log("no items in search")
         return res.status(500).send(false);
       }
       // If 1 or more items is returned filter object to return infomation
       let list = createBookList(bookResults);
       res.status(200).send(list)
       // return res.status(200).send(list);
    }
  })
});


router.post('/api/add-book', function (req, res) {

  // Remove user from body object and take from JSON web Token
  let data = req.body;
  console.log(data, "this is req.body on add-book server")

  Trade.addBook(data.user, data, function (err, info) {
    if (err) {
      console.log(err);
    }
    res.status(200).send("successRedirect");
  });

});
/*

app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/

module.exports = router;

/*

obj.image = ele.volumeInfo.imageLinks.thumbnail;
} else {

*/

function createBookList (itemList) {
  let booksArray = [];
  itemList.items.forEach(function(e) {
    let obj = {};
    obj.title = e.volumeInfo.title;
    obj.author = e.volumeInfo.authors;

    if (!e.volumeInfo.imageLinks) {
      obj.image = "http://www.themagickalcat.com/v/vspfiles/photos/BBBUB5-2T.jpg";
    } else {
      obj.image = e.volumeInfo.imageLinks.thumbnail;
    }
    booksArray.push(obj);
  })
  return booksArray;
}

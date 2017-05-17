var mongoose = require('mongoose');
var Trade = require('../models/books.js');

module.exports = {};


module.exports.booksAvailable = function (user, callback) {

  if (user !== null) {
  Trade.find({}, "owner bookTitle BookImg TradeRequest", function (err, doc) {
    if (err) {
      callback(err);
    }
      var filteredObj = filterUser(user, doc);
      callback(null, filteredObj);
  });

} else {

  Trade.find({}, "bookTitle BookImg", function (err, doc) {
    if (err) {
      callback(err);
    }
      callback(null, doc);
  });
  }
}

module.exports.showLibrary = function (user, callback) {

  Trade.find({owner: user}, "bookTitle BookImg", function (err, doc) {
    if (err) {
      callback(err);
    }
      callback(null, doc);
  });
}


module.exports.addBook = function (user, obj, callback) {

  var newBook = new Trade();
  newBook.firstOwner = user;
  newBook.owner = user;
  newBook.title = obj.title;
  newBook.image = obj.img;
  newBook.TradeRequest = false;

  newBook.save(function (err) {
    if (err){
      throw err
    }
    callback(null, newBook);
  })
}

// Take a Book from the selection and ask for trade
module.exports.requestTrade = function (user, obj, callback) {

Trade.update({ _id: obj.id }, {TradeRequest: true, Requester: user }, function (err, doc) {
  if (err) {
    callback(err);
  }
  var obj = doc;

  callback(null, doc);
});
}

// for library page, list all the trades that are being asked of you
  module.exports.findIncTrades = function (user, callback) {
    Trade.find({owner: user, TradeRequest: true}, function (err, doc) {
        if (err) {
          callback(err);
        }
        callback(null, doc);
    })
  }

// also for library page find all the trades that you are asking for
  module.exports.findOutTrades = function (user, callback) {
    Trade.find({Requester: user}, function (err, doc) {
        if (err) {
          callback(err);
        }
        callback(null, doc);
    })
  }

  // Accept or cancel trade requests
  module.exports.handleTradeRequest = function (obj, user, callback) {
      console.log("trade request handling", obj);
        if (obj.cancel === true) {
          console.log("cancel running");
          Trade.update({ _id: obj.id, BookTitle: obj.title }, {TradeRequest: false, Requester: undefined}, function (err, doc) {
            if (err) {
              callback(err);
            }
            callback(null, doc);
          })
        } else {
          console.log("trade request aceepted, running the accept");
          Trade.find({_id: obj.id}, function (err, info) {
            if (err) {
              console.log(err);
            }
            console.log("trade accepted", info);
            console.log("=================================================================");
            var newUser = info[0].Requester;

            Trade.update({ _id: obj.id}, {owner: newUser, TradeRequest: false, Requester: undefined}, function (err, doc) {
              if (err) {
                callback(err);
              }
              callback(null, doc);
            });
          });
        }
    }

  module.exports.cancelBookRequest = function (user, book, callback) {

    Trade.update({_id: book.id, Requester: user}, {Requester: undefined, TradeRequest: false}, function (err, doc) {
        if (err) {
          callback(err)
        }
        callback(null, doc);
    })
  }

  function filterUser (user, obj) {
   obj.forEach(function (ele) {
     if (ele.owner == user) {
       ele.TradeRequest = true;
     }
   });
   return obj;
 }

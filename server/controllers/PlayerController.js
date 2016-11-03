const Country = require('../models/country')
const Player = require('../models/player')

var isLoggedIn = function (req){
  var loggedIn = (typeof(req.cookies.user) == 'undefined');
  return !loggedIn
}

module.exports.createForm = function(req,res){
  Country.find({}, function(err,docs){
      res.render('addplayer', {loggedIn: isLoggedIn(req), countries: docs})
  })
}

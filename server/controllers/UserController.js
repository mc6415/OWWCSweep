const User = require('../models/user')
const Country = require('../models/country')
const sha256 = require('sha256');
const randomstring = require('randomstring');

var isLoggedIn = function (req){
  var loggedIn = (typeof(req.cookies.user) == 'undefined');
  return !loggedIn
}

module.exports.register = function(req,res){
  res.render('register', {error: req.params["err"], loggedIn: isLoggedIn(req)})
}

module.exports.create = function(req,res){
  const user = new User();
  const uDetails = req.body;
  const salt = randomstring.generate(10);
  const pepper = randomstring.generate(10);

  user.username = uDetails.username;
  user.email = uDetails.email;
  user.salt = salt;
  user.pepper = pepper;
  user.password = sha256(salt) + sha256(uDetails.password) + sha256(pepper);

  user.save(function(err, user){
    if(typeof(err) == 'undefined'){
      res.redirect('/');
    } else{
      const errorMessage = encodeURI("Error Saving Details Contact Admin");
      res.redirect('/register/' + errorMessage)
    }
  })

}

module.exports.login = function(req,res){
  User.find({'username': req.body.username}, function(err,docs){
    if(docs.length > 0){
      const user = docs[0];
      const pass = sha256(user.salt) + sha256(req.body.password) + sha256(user.pepper);
      if(pass == user.password){
        var userCookie = {
          "_id" : user._id,
          "username": user.username,
          "email": user.email,
          "obfuscation": user.password
        }
        res.cookie('user', JSON.stringify(userCookie));
        res.redirect('/dashboard');
      } else {
        res.redirect('/' + encodeURI("Couldn't log in was the password wrong?"))
      }
    } else {
      res.redirect('/' + encodeURI("Username not found, please sign up before logging in"))
    }
  })
}

module.exports.dashboard = function(req,res){
  var loggedIn = isLoggedIn(req);
  if(!loggedIn) res.redirect('/');

  var countryTaken = Country.find({takenBy: JSON.parse(req.cookies.user).username}, function(err,docs){
    if(docs.length > 0){
      res.render('dashboard', {loggedIn: loggedIn, country: docs[0]})
    } else {
      res.render('dashboard', {loggedIn: loggedIn})
    }
  })



}

module.exports.signout = function(req,res){
  res.clearCookie('user')
  res.redirect('/');
}

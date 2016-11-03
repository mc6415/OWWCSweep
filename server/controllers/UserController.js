const User = require('../models/user')
const sha256 = require('sha256');
const randomstring = require('randomstring');

module.exports.register = function(req,res){
  res.render('register', {error: req.params["err"]})
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
      res.redirect('/register/Error%20Saving%20Details%20Contact%20Admin')
    }
  })

}

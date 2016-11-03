const User = require('../models/user')
const Country = require('../models/country')

module.exports.signup = function(req,res){
  Country.find({taken: false}, function(err,docs){
    if(docs.length > 0){
      var countries = docs.length;
      var index = Math.floor((Math.random() * countries))
      console.log(JSON.parse(req.cookies.user).username);
      docs[index].taken = true;
      docs[index].takenBy = JSON.parse(req.cookies.user).username;

      docs[index].save();
      res.redirect('/dashboard')
    }
  })
}

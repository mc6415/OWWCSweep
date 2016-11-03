const Country = require('../models/country')

var isLoggedIn = function (req){
  var loggedIn = (typeof(req.cookies.user) == 'undefined');
  return !loggedIn
}

var isAdmin = function(req){
  if(isLoggedIn(req)){
    return JSON.parse(req.cookies.user).isAdmin > 0;
  }
  return false;
}

module.exports.createForm = function(req,res){
  console.log(req.params)
  if(req.params["access"] == 'override'){
    res.render('createcountry', {loggedIn: isLoggedIn(req)});
  } else {
    res.send("No Access")
  }
}

module.exports.create = function(req,res){
  const country = new Country();
  const countryDetails = req.body
  country.name = countryDetails.name;
  country.code = countryDetails.code;
  country.flag = 'http://flags.fmcdn.net/data/flags/normal/'+ countryDetails.code +'.png'
  country.description = countryDetails.desc

  country.save();

  res.status(201).redirect('/country/create/override');

}

module.exports.view = function(req,res){
  console.log(isLoggedIn(req));
  if(typeof(req.params.code) == 'undefined'){
    Country.find({}, function(err,docs){
      res.render('viewcountries', {countries: docs, loggedIn: isLoggedIn(req), isAdmin: isAdmin(req)})
    })
  } else {
    Country.find({code: req.params.code}, function(err,docs){
      if(docs.length > 0){
          res.render('viewcountry', {country: docs[0], loggedIn: isLoggedIn(req)})
      }
    })
  }
}

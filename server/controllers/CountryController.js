const Country = require('../models/country')

module.exports.createForm = function(req,res){
  console.log(req.params)
  if(req.params["access"] == 'override'){
    res.render('createcountry');
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
  if(typeof(req.params.code) == 'undefined'){
    Country.find({}, function(err,docs){
      res.render('viewcountries', {countries: docs})
    })
  } else {
    Country.find({code: req.params.code}, function(err,docs){
      if(docs.length > 0){
          res.render('viewcountry', {country: docs[0]})
      }
    })
  }
}

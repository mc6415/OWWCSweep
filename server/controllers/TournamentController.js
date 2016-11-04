const Tournament = require('../models/tournament');

module.exports.update = function(req,res){
  Tournament.remove({}, function(){
    var tournament = new Tournament();
    tournament.data = req.body.data;

    tournament.save();
  })
}

module.exports.getTournament = function(req,res){
  Tournament.find({}, function(err, docs){
    res.send(docs[0]);
  })
}

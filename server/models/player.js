const mongoose = require('mongoose');

module.exports = mongoose.model('Player', {
  name: {type: String, required: true, unique: true},
  countryId: {type: String, unique: true},
  proTeam: {type: String},
  sr: {type: Number}
})

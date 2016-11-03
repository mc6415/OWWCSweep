const mongoose = require('mongoose');

module.exports = mongoose.model('Country', {
  name: {type: String, required: true, unique: true},
  code: {type: String, unique: true},
  flag: {type: String, required: true},
  taken: {type: Boolean, default: false, required: true},
  takenBy: {type: String},
  points: {type: Number, default: 0},
  eliminated: {type: Boolean, default: false},
  description: {type: String}
})

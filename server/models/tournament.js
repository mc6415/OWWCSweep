const mongoose = require('mongoose');

module.exports = mongoose.model('Tournament', {
  data: {type: String}
})

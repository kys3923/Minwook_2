const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  totalParty: Number,
  comments: String,
  customer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Reservation', reserveSchema);
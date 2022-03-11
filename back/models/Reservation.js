const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
  totalParty: Number,
  comments: String,
  email: String,
  contact: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isShowedUp: {
    type: Boolean,
    default: false
  },
  reserveDate: Date,
}, {timestamps: true});

const Reservation = mongoose.model('Reservation', reserveSchema);

module.exports = Reservation;
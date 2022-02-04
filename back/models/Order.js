const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  totalPrice: Number,
  orderedItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  comments: String,
  isDelivery: {
    type: Boolean,
    default: false
  },
  customer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  willReadyBy: Date
}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);
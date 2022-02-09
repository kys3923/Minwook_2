const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  isReady: {
    type: Boolean,
    default: false
  },
  willReadyBy: Date
}, {timestamps: true});

OrderSchema.index({ updatedAt: 1 })

module.exports = mongoose.model('Order', OrderSchema);
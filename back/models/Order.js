const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.createConnection(process.env.MONGODB_URI)

autoIncrement.initialize(connection);

const OrderSchema = new mongoose.Schema({
  orderedItem: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      instructions: String,
      addOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      }
    },
  ],
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
  isFinished: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  grandTotal: Number,
  willReadyBy: Date
}, {timestamps: true});

OrderSchema.index({ updatedAt: 1 });
OrderSchema.plugin(autoIncrement.plugin, { model: 'OrderNumber', field: 'OrderNumber', startAt: 10000});

let OrderNumber = connection.model('OrderNumber', OrderSchema);

module.exports = mongoose.model('Order', OrderSchema);
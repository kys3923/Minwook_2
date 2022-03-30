const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.createConnection(process.env.MONGODB_URI)

autoIncrement.initialize(connection);

const OrderSchema = new mongoose.Schema({
  orderedItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      options: [
        {
          option: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
          },
          qty: Number,
          name: String,
          price: Number,
          selected: {
            type: Boolean,
            default: false
          }
        }
      ],
      name: String,
      price: Number,
      qty: Number,
      comments: String,
      salGoneOrRain: String,
      porkOrVeg: String,
      spicyOrSweet: String,
      rollChoices: [
        { roll1: String,
          roll2: String,
          roll3: String
        }
      ],
      caliOrSpTuna: String,
      tunaOrSalmon: String,
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
  isAgreed: {
    type: Boolean,
    default: false
  },
  isPlaced: {
    type: Boolean,
    default: false
  },
  isPaidAtRestaurant: {
    type: Boolean,
    default: false,
  },
  addOns: [
    { 
      addOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      qty: Number,
      name: String,
      price: Number
    }
  ],
  grandTotal: Number,
  addOnTotal: Number,
  willReadyBy: Date
}, {timestamps: true});

OrderSchema.index({ updatedAt: 1 });
OrderSchema.plugin(autoIncrement.plugin, { model: 'OrderNumber', field: 'OrderNumber', startAt: 10000});

let OrderNumber = connection.model('OrderNumber', OrderSchema);

module.exports = mongoose.model('Order', OrderSchema);
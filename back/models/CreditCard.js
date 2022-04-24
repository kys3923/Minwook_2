const mongoose = require('mongoose');

const CreditCardSchma = new mongoose.Schema({
  line1: String,
  city: String,
  state: String,
  country: String,
  name: String,
  brand: String,
  cvc: Number,
  exp: String,
  last4: String,
  postal: String,
  number: String,
});

module.exports = mongoose.model('CreditCard', CreditCardSchma);
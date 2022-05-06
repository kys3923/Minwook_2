const mongoose = require('mongoose');

const StoreStatusSchema = new mongoose.Schema({
  status: String,
  auto: Boolean
})

const StoreStatus = mongoose.model('StoreStatus', StoreStatusSchema);

module.exports = StoreStatus;
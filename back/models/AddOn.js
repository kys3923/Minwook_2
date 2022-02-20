const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
  addOnText: String,
  price: Number,
  orderedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  cusomer:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

module.exports = mongoose.model('AddOn', AddOnSchema);
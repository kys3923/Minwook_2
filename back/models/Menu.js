const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: String,
  caption: String,
  description: String,
  price: Number,
  category: String,
  Sub_Category: String,
  stock_availability: {
    type: Boolean,
    default: true
  }
})

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
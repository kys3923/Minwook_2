const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'This field is required'
  },
  lastName: {
    type: String,
    required: 'This field is required'
  },
  contactNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

mongoose.model('user', userSchema);
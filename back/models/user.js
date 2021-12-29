const mongoose = require('mongoose');

const options = {
  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, userDocToReturn) => {
      delete userDocToReturn.password;
      return userDocToReturn;
    },
  },
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },  
  },
  options
);

module.exports = mongoose.model('User', userSchema)
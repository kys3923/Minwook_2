require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
}),
err => {
  if (!err) {
    console.log('Connection success to db')
  } else {
    console.log('Error in connecting db' +err)
  }
};

require('./user.model')
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.once('open', () => 
  console.log(`Connected to db: ${mongoose.connection.name} at ${mongoose.connection.host}:${mongoose.connection.port}`));

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error:`, err)
});

module.exports.User = require('./user');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');
const app = express();
connectDB();


// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json())

// Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

// routes
app.get('/', (req, res, next) => {
  res.json({
    message: 'welcome to database'
  });
});

// controllers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/menu', require('./routes/menu'));

// opening server
const server =  app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at ${process.env.PORT || 8000}`)
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logging in Error: ${err.message}`);
  server.close(() => process.exit(1));
});
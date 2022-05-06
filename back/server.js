require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');
const socketUtils = require('./utils/socketUtils');
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at ${process.env.PORT || 8000}`)
});
const io = socketUtils.sio(server).listen(server, () => {
  console.log(`IO is running also`)
});
connectDB();
socketUtils.connection(io);


// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json())

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
}

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
app.use('/api/reservation', require('./routes/reservation'));
app.use('/api/order', require('./routes/order'));
app.use('/api/creditcard', require('./routes/creditCard'));
app.use('/api/status', require('./routes/storeStatus'));
app.use('/api/ws/orders', socketIOMiddleware, (req, res) => {
  req.io.emit('message', `Hello, ${req.originalUrl}`);
  res.send('hello, you are at websocket connection route')
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logging in Error: ${err.message}`);
  server.close(() => process.exit(1));
});
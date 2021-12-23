require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allw-prototype-access');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sushiVille');

// const db = mongoose.connection

// db.once('open', function() {
//   console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
// })

// db.on('error', function(err) {
//   console.error(`Database error:\n${err}`)
// })

// routes
app.get('/', (req, res) => {
  res.send(`
  <h2>Welcome to database</h2>
  <h3>Click here to get access to the <B> <a href="/user/list">Database</a></b></h3>`);
});

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs',
  defaultlayout: 'MainLayout',
  layoutDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs');
// controllers

// opening server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at ${process.env.PORT || 8000}`)
});
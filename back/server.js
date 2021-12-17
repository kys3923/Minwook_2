const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World 2');
});

app.listen(8000, ()=>{
  console.log('Server is running at 8000')
});
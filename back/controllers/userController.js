const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
  res.render('user/addOrEdit', {
    viewTitle: 'Insert User'
  })
})

router.post('', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res)
  } else {
    updateRecord(req, res)
  }
})

function
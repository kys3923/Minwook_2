// const express = require('express');
// const db = require('../models')
// const mongoose = require('mongoose');
// const passport = require('passport');

// router.get('/', (req, res) => {
//   res.render('user/addOrEdit', {
//     viewTitle: 'Insert User'
//   })
// })

// router.get('/profile', (req, res) => {

// })

// router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
//   console.log(` Signed in with ${ req.user }`)

//   db.User.findOne({ email: req.body.email })
//     .then(userSearched => {
//       console.log(`searched user ${userSearched}`);
//       res.status(201).json(userSearched)
//     })
// })
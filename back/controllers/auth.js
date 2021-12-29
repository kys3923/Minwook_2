const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const { createUserToken } = require('../middleware/auth');

// URL prefix - /api

// Signup - POST /api/signup
router.post('/signup', (req, res) => {
	// res.json({ message: 'SignUp POST' }); // test purpose
	bcrypt
		.hash(req.body.password, 10) //hashing the password
		.then((hash) =>
			db.User.create({
				name: req.body.name,
				email: req.body.email,
				password: hash
			})
		)
		.then((createdUser) =>
			res.json({
				token: createUserToken(req, createdUser),
				user: createdUser
			})
		)
		.catch((err) => {
			console.log(`ERROR in the POST signup`, err);
			res.json({ error: err });
		});
	// db.User.create(req.body)
	// 	.then((user) => res.json(user))
	// 	.catch((err) => {
	// 		console.log(`Error in the POST signup:`, err);
	// 		res.json({ error: err });
	// 	});
});

// Login - POST /api/login
router.post('/login', (req, res) => {
	res.json({ message: 'LogIn POST' });
});

module.exports = router;
// can check jwt token at jwt.io
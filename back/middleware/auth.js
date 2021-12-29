// Require Passport
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Construct the Strategy
const options = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const findUser = (jwt_payload, done) => {
	db.User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		// .catch(err => done(err, null))
		.catch(done);
};

const strategy = new Strategy(options, findUser);

// Register the strategy so passport uses it when we call "passport.authenticate()" in our routes
passport.use(strategy);

// initialize passport
passport.initialize();

// write a function that creates a jwt function
const createUserToken = (req, user) => {
	// check the password from the req.body against the user
	const validPassword = bcrypt.compareSync(req.body.password, user.password); //boolean

	// if we didn't get a user or the password isn't valid, then throw an error
	if (!user || !validPassword) {
		const err = new Error('Invalid Credentials 🛑');
		err.statusCode = 422;
		throw err;
	} else {
		// otherwise create and sign a new token
		return jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '30m' } // TODO: extend for production
		);
	}
};

module.exports = { createUserToken };
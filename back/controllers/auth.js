const User = require ('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.register = async ( req, res, next ) => {
	const { username, email, password, isAdmin, address1, address2, address3, contact } = req.body;

	try {
		const user = await User.create({
			username, 
			email, 
			password, 
			isAdmin, 
			address1, 
			address2,
			address3,
			contact
		});

		sendToken(user, 201, res);

	} catch (error) {
		next(error);
	}
};

exports.login = async ( req, res, next ) => {
	const { email, password } = req.body;

	if(!email || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400))
	}

	try {
		const user = await User.findOne ({ email }).select("+password");

		if(!user) {
			return next(new ErrorResponse("Invalid Credentials", 401))
		}

		const isMatch = await user.matchPasswords(password);

		if(!isMatch) {
			return next(new ErrorResponse("Invalid Credentials", 401))
		}

		sendToken(user, 200, res);

	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

exports.forgotpassword = async ( req, res, next ) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if(!user) {
			return next(new ErrorResponse("Email could not be sent", 404))
		}

		const resetToken = user.getResetPasswordToken();

		await user.save();

		const resetUrl = `http://localhost:8000/passwordreset/${resetToken}`;

		const message = `
			<h1>You have requested a password reset</h1>
			<p>Please go to this link to reset your password</p>
			<a href=${resetUrl} clicktrackgin=off>${resetUrl}</a>
		`
		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Request",
				text: message
			});

			res.status(200).json({ success: true, data: "Email Sent" });
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse("Email could not be send", 500))
		}
	} catch (error) {
		next(error);
	}
};

exports.resetpassword = async ( req, res, next ) => {
	const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

	try{
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() }
		})

		if(!user) {
			return next(new ErrorResponse("Invalid Reset Token", 400))
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: "Password Reset Success"
		})
	} catch (error) {
		next(error);
	}
};

exports.listAllUser = async ( req, res, next ) => {

	const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i"}} : {};

  try {
    const user = await User.find(condition);

    res.json({
      message: "all menu listed",
      user
    })
  } catch (error) {
    next(error);
  }
}

// list 1 user
exports.listUser = async ( req, res, next ) => {
	const id = req.params.id;

	if(!id) {
		return next(new ErrorResponse('we need an id to request', 400))
	}

	try {
		const user = await User.findById(id)
		.populate({
			path: 'Orders',
			populate: {
				path: 'orderedItem',
				model: 'Menu'
			}
		})
		.populate('Reservations')
		
		res.json({
			message: 'found user listed',
			user
		})
	} catch (error) {
		next(error)
	}
}
// update 1 user
exports.editUser = async ( req, res, next ) => {
	const id = req.params.id;
	const { username, address1, email, contact, password, isAdmin } = req.body;

	try {
		const user = await User.findByIdAndUpdate(id, {
			username,
			email,
			contact,
			address1,
			password,
			isAdmin
		});

		res.json({
			message: "updated the user",
			user
		})
	} catch (error) {
		next(error)
	}
}
// delete 1 user

exports.deleteUser = async ( req, res, next ) => {
	const id = req.params.id;
	const {
		username,
		email,
		password,
		isAdmin,
		address1,
		contact,
		Orders,
		Reservations
	} = req.body

	try {
		const user = await User.findByIdAndRemove(id, {
			username,
			email,
			password,
			isAdmin,
			address1,
			contact,
			Orders,
			Reservations
		});

		res.json({
			message: "user has been deleted",
			user
		})
	} catch (error) {
		next(error)
	}
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({ success: true, token, role: user.isAdmin, userId: user._id })
}
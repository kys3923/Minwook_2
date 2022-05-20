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

		//TODO: send welcome email
		const welcomeMsg =`
		<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div
      class="mail-container"
      style="
        width: 100%;
        background-color: #fdfdfd;
      "
    >
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
			<div style="margin-top: 1em;">
				<img
					style="max-width: 125px;"
					src="${process.env.LOGO_LOCATION}"
				/>
			</div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: darkgreen;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Welcome to Sushiville <br />
          ${username} !
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you for starting your sushi journey with us.<br />
          We're excited to serve your take-out orders online now.<br />
          Also, you can now reserve a table at your convinence.
        </p>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          You're almost ready to get started. <br />
          Please
          <a
            style="text-decoration: none; color: #dc5a41;"
            href="http://www.sushivilleny.com"
            >visit our website</a
          >
          to start your journey!
        </p>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Sushiville</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
					margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          &#169; Sushiville, 67 Orange Turnpike, Sloatsburg, NY 10974, (845) 712
          - 5006<br /><br />
          This email was sent to ${email} to update you about
          registering account in
          <a
            href="http://www.sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >sushivilleny.com.</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: service@sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >service@sushivilleny.com</a
          >
        </p>
        <p></p>
      </div>
    </div>
  </body>`

	const sendWelcomeEmail = async () => {
		try {
			await sendEmail({
				to: email,
				subject: 'Welcome to Sushiville',
				text: welcomeMsg
			})
		} catch (err) {
			console.log(err);
		}
	}

	sendWelcomeEmail();

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

		// TODO: update server URL
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
			<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link
				href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
				rel="stylesheet"
			/>
		</head>
		<body>
			<div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
				<div
					style="
						min-width: 400px;
						max-width: 900px;
						border-top: 1px solid #dc5a41;
						border: 1px solid lightgray;
						background-color: white;
						margin: 2em auto;
						padding: 1em 3em;
						border-radius: 5px;
					"
				>
				<div style="margin-top: 1em;">
					<img
						style="max-width: 125px;"
						src="${process.env.LOGO_LOCATION}"
					/>
				</div>
					<h1
						style="
							font-family: roboto;
							font-weight: bold;
							color: darkgreen;
							margin-bottom: 1em;
							margin-top: 1em;
						"
					>
						Password Reset Request
					</h1>
					<p
						style="
							font-size: 18px;
							font-family: roboto;
							line-height: 1.5em;
							color: rgb(88, 88, 88);
						"
					>
						You have requested a password reset.<br />
						Please go to this link to reset your password<br />
						<a href=${resetUrl} clicktrackgin=off>${resetUrl}</a>
					</p>
	
					<p
						style="
							font-size: 18px;
							font-family: roboto;
							line-height: 1.5em;
							color: rgb(88, 88, 88);
						"
					>
						Thank you, <br />
						<span style="color: darkgreen; font-weight: bold; line-height: 3em;"
							>Sushiville</span
						>
					</p>
				</div>
				<div
					style="
						min-width: 400px;
						max-width: 900px;
						border-top: 1px solid #dc5a41;
						margin: 0em 2em;
						padding: 1em 2em;
						text-align: center;
						font-family: roboto;
						margin: 0 auto;
					"
				>
					<p style="font-size: 0.75em; color: gray;">
						&#169; Sushiville, 67 Orange Turnpike, Sloatsburg, NY 10974, (845) 712
						- 5006<br /><br />
						This email was sent to {customer email} to update you about
						resetting password in
						<a
							href="http://www.sushivilleny.com"
							style="text-decoration: none; color: #dc5a41;"
							>sushivilleny.com.</a
						>
						<br />
						Qeustions, comments, and support for Sushiville are available to
						<a
							href="mailto: service@sushivilleny.com"
							style="text-decoration: none; color: #dc5a41;"
							>service@sushivilleny.com</a
						>
					</p>
					<p></p>
				</div>
			</div>
		</body>
		`
		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Request - sushiville",
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
	console.log('hey')
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

		const successMsg = `
		<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
				<div style="margin-top: 1em;">
					<img
						style="max-width: 125px;"
						src="${process.env.LOGO_LOCATION}"
					/>
				</div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: darkgreen;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Password Reset Confirmation
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          You have successfully updated your password.<br />
					Please <a href="http:www.sushivilleny.com" style="text-decoration: none; color: #dc5a41;">login</a> and enjoy your sushi adventure!
        </p>

        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Sushiville</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 400px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
					margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          &#169; Sushiville, 67 Orange Turnpike, Sloatsburg, NY 10974, (845) 712
          - 5006<br /><br />
          This email was sent to {customer email} to update you about
          resetting password in
          <a
            href="http://www.sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >sushivilleny.com.</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: service@sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >service@sushivilleny.com</a
          >
        </p>
      </div>
    </div>
  </body>
		`

		const sendSuccessEmail = async () => {
			try {
				await sendEmail({
					to: user.email,
					subject: 'Password reset success - Sushiville',
					text: successMsg
				})
			} catch (err) {
				console.log(err);
			}
		}
	
		sendSuccessEmail();

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
			path: 'Orders'
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
	const id = req.body.id;
	const { username, address1, email, contact } = req.body;
	try {
		const user = await User.findByIdAndUpdate(id, {username, address1, email, contact});

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
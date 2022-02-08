const User = require("../models/User")

exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "you got access to the private data in this route",
    loggedIn: req.user.id
  })
}
const AddOn = require('../models/AddOn');
const ErrorResponse = require('../utils/errorResponse');
const Menu = require('../models/Menu');
const User = require('../models/User');

exports.createAddOn = async ( req, res, next ) => {
  try {
    const addon = new AddOn(req.body);
    addon.customer = req.user._id;
    await addon.save();


  }catch (error) {
    next(error)
  }
}
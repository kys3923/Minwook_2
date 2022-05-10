const StoreStatus = require('../models/StoreStatus');
const ErrorResponse = require('../utils/errorResponse');

exports.checkStatus = async ( req, res ) => {
  try {
    const status = await StoreStatus.find({});

    res.json({message: 'sending status', status})
  } catch (err) {
    console.log(err)
  }
}

exports.updateStatus = async ( req, res, next ) => {
  const id = req.params.id;
  const { isOpenStoreAuto, manualStatus } = req.body;
  console.log(req.body, 'request')

  if ( isOpenStoreAuto === '' ) {
    return next(new ErrorResponse('status need to be provided', 400))
  } 

  try {
    const request = await StoreStatus.findByIdAndUpdate(id, {isOpenStoreAuto, manualStatus})

    request.save()

    res.json({
      message: 'status has been updated'
    })
  } catch (err) {
    next(err);
  }
}

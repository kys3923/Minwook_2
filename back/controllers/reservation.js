const Reservation = require('../models/Reservation');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.registerReservation = async ( req, res, next ) => {
  
  try {
    
    const reservation = new Reservation(req.body);
    await reservation.save();
    const user = await User.findById({_id: req.body.customer})
    user.Reservations.push(reservation);
    await user.save();

    res.json({
      message: "reservation made",
      reservation,
      user
    })
    // TODO: send email to customer and the request email
  } catch (error) {
    next(error)
  }

}

exports.reservationList = async ( req, res, next ) => {
  const id = req.params.id;
  if(!id) {
    return next(new ErrorResponse("No reservation was found", 400))
  }

  try {
    const reservation = await Reservation.find({"_id": id})

    res.json({
      message: "found reservation requested",
      reservation
    })
  } catch (error) {
    next(error)
  }
}

exports.listAllReservations = async ( req, res, next ) => {

  try {
    const reservation = await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({reserveDate: -1});

    res.json({
      message: "listing all reservations",
      reservation
    })
  } catch (error) {
    next(error)
  }
}

exports.updateRerservations = async ( req, res, next ) => {

  const id = req.params.id;
  const { totalParty, comments, isShowedUp, reserveDate } = req.body;

  try {

    const reservation = await Reservation.findByIdAndUpdate(id, {
      totalParty,
      comments,
      isShowedUp,
      reserveDate
    })

    res.json({
      message: "reservation has been updated",
      reservation
    })

  } catch (error) {
    next(error)
  }
}
exports.deleteReservation = async ( req, res, next ) => {

  const id = req.params.id;
  const { name, totalParty, comments, customer, isShowedUp, reserveDate } = req.body;
  
  try {
    const user = await User.findById({_id: req.user._id});
    let ReserveItems = user.Reservations;
    for (let i = 0; i < ReserveItems.length; i++) {
      if (ReserveItems[i] == id) {
        ReserveItems.splice(i, 1);
      }
    }
    await user.save();
    
    const reservation = await Reservation.findByIdAndRemove(id, {
      name,
      totalParty,
      comments,
      customer,
      isShowedUp,
      reserveDate
    })

    res.json({
      message: "reservation has been deleted",
      reservation,
      user
    })

  } catch (error) {
    next(error)
  }

}

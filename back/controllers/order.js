const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Menu = require('../models/Menu');

exports.orderRegistration = async ( req, res, next ) => {

  try {

    const order = new Order(req.body);
    // const menu = await Menu.findById({_id: req.body.orderedItems.item, _id: req.body.orderedItems.options.option, _id: req.body.orderedItems.addOn })
    await order.save();
    const user = await User.findById({_id: req.body.customer})
    user.Orders.push(order);
    await user.save();

    res.json({
      message: "order has been made",
      order,
      user
    })
  } catch (error) {
    next(error)
  }
}

exports.orderList = async ( req, res, next ) => {
  const id = req.params.id;

  if(!id) {
    return next(new ErrorResponse("No order was placed", 400))
  }

  try {

    const order = await Order.find({"_id" : id })

    res.json({
      message: "found order listing",
      order
    })
  } catch (error) {
    next(error)
  }
}

exports.orderAllList = async ( req, res, next ) => {

  try {

    const listOrder = await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1})

    res.json({
      message: "listing all orders",
      listOrder
    })

  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async ( req, res, next ) => {
  const id = req.params.id;
  const { grandTotal, comments, isConfirmed, isReady, isFinished, isPaid, isAgreed, willReadyBy, isDelivery, orderedItem, addOns, addOnTotal, isPaidAtRestaurant } = req.body;

  try {

    const order = await Order.findByIdAndUpdate(id, {
      grandTotal,
      comments,
      isConfirmed,
      isReady,
      willReadyBy,
      isDelivery,
      orderedItem,
      addOns,
      addOnTotal,
      isPaidAtRestaurant,
      isAgreed,
      isFinished,
      isPaid
    })


    order.save();

    res.json({
      message: "order has been updated",
      order
    })

    //TODO: send customer an email/text to confirm the change, isReady, isConfirmed,

  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async ( req, res, next) => {
  const id = req.params.id;
  const { totalPrice, orderedItem, comments, isDelivery, customer, isConfirmed, isReady, willReadyBy } = req.body;

  try {
    let locateOrder = await Order.findById({_id: id})
    let customerInOrder = locateOrder.customer
    const user = await User.findById({_id: customerInOrder});
    let OrderedItems = user.Orders;
    for (let i = 0; i < OrderedItems.length; i++) {
      if (OrderedItems[i] == id) {
        OrderedItems.splice(i, 1);
      }
    }
    await user.save();

    const order = await Order.findByIdAndRemove(id, {
      totalPrice,
      orderedItem,
      comments,
      isDelivery,
      customer,
      isConfirmed,
      isReady,
      willReadyBy
    })

    res.json({
      message: "order has been deleted",
      order,
      user
    })
  } catch (error) {
    next(error)
  }
}
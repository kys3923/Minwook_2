const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const stripe = require('stripe')(`${process.env.STRIPE_API_SECRET}`)

exports.chargeCard = async (req, res) => {
  const { orderNumber, totalAmount } = req.body;
  // calculate
  const calculateOrderAmount = (order) => {
    return order * 100;
  }
  // post
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(totalAmount),
      currency: 'USD',
      description: `Order #${orderNumber}`
    })

    res.status(200).send(paymentIntent.client_secret)


  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    })
  }
// send email
}

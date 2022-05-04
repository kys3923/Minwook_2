const CreditCard = require('../models/CreditCard');
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

    // return res.status(200).json({
    //   confirmed: payment
    // })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    })
  }
  // send email
}

exports.registerCreditCard = async (req, res, next) => {

  try {
    const creditCard = new CreditCard(req.body);
    const user = await User.findById({_id: req.body.customer})
    user.CreditCards.push(creditCard);
    await user.save();

    res.json({
      message: 'credit card created',
      creditCard
    })
  } catch (error) {
    next(error);
  }
}

exports.listCard = async ( req, res, next ) => {
  const id = req.params.id;
  if(!id) {
    return next(new ErrorResponse('No credit card was found', 400))
  }

  try {
    const creditCard = await CreditCard.find({'_id': id})
    res.json({
      message: 'found credit card requested',
      creditCard
    })
  } catch (error) {
    next(error)
  }
}

exports.updateCreditCard = async ( req, res, next ) => {
  const id = req.params.id;
  if(!id) {
    return next(new ErrorResponse('No credit card was found', 400))
  }
  
  try {
    const creditCard = await CreditCard.findByIdAndUpdate(id, {
      line1, city, state, country, name, brand, cvc, exp, last4, postal, number
    })
    res.json({
      message: 'credit card has been updated',
      creditCard
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteCreditCard = async ( req, res, next ) => {
  const id = req.params.id;
  const { line1, city, state, country, name, brand, cvc, exp, last4, postal, number } = req.body;
  try {
    const user = await User.findById({_id: req.user._id});
    let CreditCards = user.CreditCards;
    for ( let i = 0; i < CreditCards.length; i++) {
      if (CreditCards[i] == id) {
        CreditCards.splice(i, 1);
      }
    }
    await user.save();

    const creditCard = await CreditCard.findByIdAndRemove(id, {
      line1, city, state, country, name, brand, cvc, exp, last4, postal, number
    })
    res.json({
      message: 'credit card has been deleted',
      creditCard,
      user
    })
  } catch (error) {
    next(error)
  }
}
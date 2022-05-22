const Order = require('../models/Order');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const sendEmail = require('./sendEmail');
const moment = require('moment');

exports.connection = (io) => {

  let newOrders = []
  let newReservations = []

  io.on('connection', (socket) =>  {
    console.log('a user is connnected', socket.id)

    const EmitOrders = async () => {
      await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(result => {
        newOrders = result.filter(order => !order.isFinished)
        return newOrders
      })
      socket.emit('Orders', newOrders)
    }

    const EmitReservations = async () => {
      await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({ updatedAt: -1}).then(result => {
        newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isDenied)
        return newReservations
      })
      socket.emit('Reservations', newReservations)
    }
    
    EmitOrders();
    EmitReservations();

    // ============================================= ORDERS
    // --------------------------------------------- receive new orders
    socket.on('newOrder', (order) => {

      let receivedOrder = order;

      const gettingDataBase = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(result => {
          newOrders = result.filter(order => !order.isFinished)
          return newOrders
        })
        io.sockets.emit('Orders', newOrders)
      }

      const sendNewOrderEmail = async () => {

        let customer
        // find customer
        const findCustomer = async () => {
          customer = await User.findById({_id: receivedOrder.customer})
          return customer
        }
        await findCustomer();
        // set msgs
        const textFormatter = (order, text) => {
          if (text === 'orderNumber') {
            return `${order.OrderNumber}`
          } else if (text === 'customer') {
            return `${customer.username}`
          } else if (text === 'total') {
            return `$ ${order.grandTotal.toFixed(2)}`
          } else if (text === 'date') {
            return `${moment(order.createdAt).format('LLL')}`
          } else if (text === 'pickup') {
            let returnText = ''
            order.isPaidAtRestaurant ? returnText = 'Your order is not paid yet, please pay at pick-up counter.' : returnText = 'Payment Received'
            return returnText
          } else {
            return 'Wrong Data Input'
          }
        }

        const orderPlacementEmail = `
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
                min-width: 250px;
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
                  style="max-width: 150px;"
                  src="http://localhost:8000/public/images/logo_sushivill.png"
                />
              </div>
              <h1
                style="
                  font-family: roboto;
                  font-weight: bold;
                  color: #dc5a41;
                  margin-bottom: 1em;
                  margin-top: 1em;
                "
              >
                Thank you for your order, ${textFormatter(receivedOrder, 'customer')}!
              </h1>
              <p
                style="
                  font-size: 18px;
                  font-family: roboto;
                  line-height: 1.5em;
                  color: rgb(88, 88, 88);
                "
              >
                We've received you order and are working on to process it.<br />
                Please allow us preperation time around 20-30 minutes. <br />
                <span style="color: gray; font-style: italic; font-size: 0.85em;"
                  >(longer time expected on busy hours)</span
                ><br /><br />
                When your order is ready to be picked up, we will send you an email to
                let you know it is ready.<br />
                <br />
                It is always appreciated to let us know your name, or to show us email
                at pick-up counter.
              </p>
              <h2
                style="
                  font-family: Roboto;
                  color: darkgreen;
                  display: inline-block;
                  width: 90%;
                  border-bottom: 1px solid #dc5a41;
                "
              >
                Your Order
              </h2>
              <table
                style="
                  border-spacing: 5px;
                  margin: 15px 0;
                  font-family: roboto;
                  color: gray;
                "
              >
                <tr>
                  <td>Pick-up Name:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(receivedOrder, 'customer')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Order Number:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(receivedOrder, 'orderNumber')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Order Placed:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(receivedOrder, 'date')}</span></td>
                </tr>
                <tr>
                  <td>Order Total:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(receivedOrder, 'total')}</span
                    >
                  </td>
                </tr>
              </table>
              <div
                style="
                  padding-left: 5px;
                  border-bottom: 1px solid #dc5a41;
                  width: 90%;
                  margin-bottom: 2.5em;
                "
              >
                <p style="font-family: roboto; color: gray; padding-bottom: 20px;">            <span style="line-height: 2em; color: #dc5a41; font-weight: bold;"
                >${textFormatter(receivedOrder, 'pickup')}</span
              ><br />
                  67 Orange Turnpike, Sloatsburg, NY 10974
                  <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
                </p>
              </div>
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
                min-width: 250px;
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
                This email was sent to {customer email} to update you about ordering
                in
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

        // send
        await sendEmail({
          to: customer.email,
          subject: `Sushiville - Order #${receivedOrder.OrderNumber}`,
          text: orderPlacementEmail
        })
      }

      const newOrder = async () => {
        await gettingDataBase()
        await sendNewOrderEmail()
      }

      newOrder();
    })



    // ----------------------------------------------- receive confirmed orders
    socket.on('confirmOrder', (id) => {
      const sendNewOrder = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(orders => {
          newOrder = orders.filter(order => !order.isFinished)
          io.sockets.emit('Orders', newOrder)
        })
        return newOrder
      }

      const updateDB = async () => {
        const reqId = id;
        try {
          const order = await Order.findByIdAndUpdate(reqId, { isConfirmed: true })
          await order.save();
        } catch (err) {
          console.log(err)
        }
      }

      const confirmOrder = async () => {
        await updateDB();
        await sendNewOrder();
      }
      
      confirmOrder()
    })

    // ----------------------------------------------- receive ready orders
    socket.on('readyToPickUp', (order) => {
      let readyToPickUpOrder
      let customer
      // UpdateDB
      const updateDB = async () => {
        const reqId = order;
        try {
          const order = await Order.findByIdAndUpdate(reqId, {
            isReady: true
          })
          order.save();
          readyToPickUpOrder = order
        } catch (err) {
          console.log(err)
        }
      }

      // sendNewOrder
      const sendNewOrder = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(orders => {
          newOrder = orders.filter(order => !order.isFinished)
          io.sockets.emit('Orders', newOrder)
        })
        return newOrder
      }

      // sendEmail
      const sendReadyEmail = async () => {
        // find customer
        const findCustomer = async () => {
          customer = await User.findById({_id: readyToPickUpOrder.customer})
          return customer
        }
        await findCustomer();
        // setting msg
        const textFormatter = (order, text) => {
          if (text === 'orderNumber') {
            return `${order.OrderNumber}`
          } else if (text === 'customer') {
            return `${customer.username}`
          } else if (text === 'total') {
            return `$ ${order.grandTotal.toFixed(2)}`
          } else if (text === 'isreadyon') {
            return `${moment(order.updatedAt).format('LLL')}`
          } else if (text === 'date') {
            return `${moment(order.createdAt).format('LLL')}`
          } else if (text === 'pickup') {
            let returnText = ''
            order.isPaidAtRestaurant ? returnText = 'Your order is not paid yet, please pay at pick-up counter.' : returnText = 'Payment Received'
            return returnText
          }
        }
        
        const orderReadyEmail = `
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
                min-width: 250px;
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
                  style="max-width: 150px;"
                  src="http://localhost:8000/public/images/logo_sushivill.png"
                />
              </div>
              <h1
                style="
                  font-family: roboto;
                  font-weight: bold;
                  color: #dc5a41;
                  margin-bottom: 1em;
                  margin-top: 1em;
                "
              >
                Your order is ready to be picked up!
              </h1>
              <p
                style="
                  font-size: 18px;
                  font-family: roboto;
                  line-height: 1.5em;
                  color: rgb(88, 88, 88);
                "
              >
                We've prepared your order. Please come to the pick-up counter.<br />
                It is always appreciated to let us know your name, or to show us email
                at pick-up counter.<br /><br />
                <span style="font-size: 1.25em; color: darkgreen; font-weight: bold;"
                  >Thank you for choosing Sushiville, and enjoy your food!</span
                >
              </p>
              <h2
                style="
                  font-family: Roboto;
                  color: darkgreen;
                  display: inline-block;
                  width: 90%;
                  border-bottom: 1px solid #dc5a41;
                "
              >
                Your Order
              </h2>
              <table
                style="
                  border-spacing: 5px;
                  margin: 15px 0;
                  font-family: roboto;
                  color: gray;
                "
              >
                <tr>
                  <td>Pick-up Name:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(readyToPickUpOrder, 'customer')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Order Number:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(readyToPickUpOrder, 'orderNumber')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Order Placed:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(readyToPickUpOrder, 'date')}</span></td>
                </tr>
                <tr>
                  <td>Order is ready at:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(readyToPickUpOrder, 'isreadyon')}</span></td>
                </tr>
                <tr>
                  <td>Order Total:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(readyToPickUpOrder, 'total')}</span
                    >
                  </td>
                </tr>
              </table>
              <div
                style="
                  padding-left: 5px;
                  border-bottom: 1px solid #dc5a41;
                  width: 90%;
                  margin-bottom: 2.5em;
                "
              >
                <p style="font-family: roboto; color: gray; padding-bottom: 20px;">
                  <span style="line-height: 2em; color: #dc5a41; font-weight: bold;"
                    >${textFormatter(readyToPickUpOrder, 'pickup')}</span
                  ><br />
                  67 Orange Turnpike, Sloatsburg, NY 10974
                  <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
                </p>
              </div>
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
                min-width: 250px;
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
                This email was sent to {customer email} to update you about ordering
                in
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

        await sendEmail({
          to: customer.email,
          subject: `Sushiville - Order is Ready for Pick-Up, Order #${readyToPickUpOrder.OrderNumber}`,
          text: orderReadyEmail

        })
      }

      const readyOrder = async () => {
        await updateDB();
        await sendNewOrder();
        await sendReadyEmail();
      }
      readyOrder()
      // TODO: send email
    })

    // ----------------------------------------------- receive finished orders
    socket.on('finishOrder', (order) => {
      // Update DB
      const updateDB = async () => {
        const reqId = order;
        try {
          const order = await Order.findByIdAndUpdate(reqId, { isFinished: true})
          order.save()
        } catch (err) {
          console.log(err)
        }
      }

      const sendNewOrder = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(orders => {
          newOrder = orders.filter(order =>  !order.isFinished)
          io.sockets.emit('Orders', newOrder)
        })
        return newOrder
      }

      const finishOrder = async () => {
        await updateDB();
        await sendNewOrder();
      }

      finishOrder();
    })

    socket.on('deleteOrder', (order) => {
      const deleteOrder = async () => { 
      }
      deleteOrder();
    })

    // ================================================ RESERVATIONS
    // ----------------------------------------------- receive new reservations
    socket.on('newReservation', (Data) => {
      const registerAndUpdateDB = async () => {
        const reservation = new Reservation(Data);
        await reservation.save();
        const user = await User.findById({_id: Data.customer})
        user.Reservations.push(reservation);
        await user.save();
      }

      const emitRes = async () => {
        await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({ updatedAt: -1}).then(result => {
          newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isDenied)
          return newReservations
        })
        await io.sockets.emit('Reservations', newReservations)
      }

      const sendNewReservationEmail = async () => {
        let reservation = Data
        let customer

        const findCustomer = async () => {
          customer = await User.findById({_id: Data.customer})
          return customer
        }
        await findCustomer()

        const textFormatter = (reservation, text) => {
          if (text === 'customer') {
            return `${reservation.name}`
          } else if (text === 'number') {
            return `${reservation.contact}`
          } else if (text === 'email') {
            return `${reservation.email}`
          } else if (text === 'time') {
            return `${moment(reservation.reserveDate).format('LLL')}`
          } else if (text === 'party') {
            return `${reservation.totalParty} ppl`
          } else if (text === 'comments') {
            let returnText
            !!reservation.comments ? returnText = `${reservation.comments}` : returnText = 'no comments'
            return returnText
          }
        }

        const reservationReqEmail = `
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
                min-width: 250px;
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
                  style="max-width: 150px;"
                  src="http://localhost:8000/public/images/logo_sushivill.png"
                />
              </div>
              <h1
                style="
                  font-family: roboto;
                  font-weight: bold;
                  color: #dc5a41;
                  margin-bottom: 1em;
                  margin-top: 1em;
                "
              >
                Thank you for submitting your reservation request!
              </h1>
              <p
                style="
                  font-size: 18px;
                  font-family: roboto;
                  line-height: 1.5em;
                  color: rgb(88, 88, 88);
                "
              >
                We've received your reservation request.<br />
                We will send you another email when we confirm your reservation.<br />
                Thank you for your consideration!<br />
              </p>
              <h2
                style="
                  font-family: Roboto;
                  color: darkgreen;
                  display: inline-block;
                  width: 90%;
                  border-bottom: 1px solid #dc5a41;
                "
              >
                Your Reservation Request
              </h2>
              <table
                style="
                  border-spacing: 5px;
                  margin: 15px 0;
                  font-family: roboto;
                  color: gray;
                "
              >
                <tr>
                  <td>Reserve Name:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(reservation, 'customer')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(reservation, 'number')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Email:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(reservation, 'email')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Reserve Time:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(reservation, 'time')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td># of Party:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(reservation, 'party')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Comments:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(reservation, 'comments')}</span></td>
                </tr>
              </table>
              <div
                style="
                  padding-left: 5px;
                  border-bottom: 1px solid #dc5a41;
                  width: 90%;
                  margin-bottom: 2.5em;
                "
              >
                <p style="font-family: roboto; color: gray; padding-bottom: 20px;">
                  67 Orange Turnpike, Sloatsburg, NY 10974
                  <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
                </p>
              </div>
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
                min-width: 250px;
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
                This email was sent to {customer email} to update you about making a
                reservation in
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

        await sendEmail({
          to: reservation.email,
          subject: `Sushiville - Reservation Request, ${reservation.name} - ${moment(reservation.reserveDate).format('LLL')}`,
          text: reservationReqEmail
        })
      }

      const newReservation = async () => {
        await registerAndUpdateDB();
        await emitRes();
        await sendNewReservationEmail();
      }

      newReservation();
    })

    //-----------------------------------------------  receive confirmed reservations
    socket.on('confirmReservation', (id) => {
      const updateDB = async () => {
        try { 
          const reservation = await Reservation.findByIdAndUpdate(id, { isConfirmed: true })
          await reservation.save()
        } catch (err) {
          console.log(err)
        }
      }

      const emitRes = async () => {
        await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({ updatedAt: -1}).then(result => {
          newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isD)
          return newReservations
        })
        await io.sockets.emit('Reservations', newReservations)
      }

      const sendConfirmResEmail = async () => {
        let confirmedRes

        const setRes = async () => {
          confirmedRes = await Reservation.findById({_id: id})
          return confirmedRes
        }
        await setRes();

        const textFormatter = (reservation, text) => {
          if (text === 'customer') {
            return `${reservation.name}`
          } else if (text === 'number') {
            return `${reservation.contact}`
          } else if (text === 'email') {
            return `${reservation.email}`
          } else if (text === 'time') {
            return `${moment(reservation.reserveDate).format('LLL')}`
          } else if (text === 'party') {
            return `${reservation.totalParty} ppl`
          } else if (text === 'comments') {
            let returnText
            !!reservation.comments ? returnText = `${reservation.comments}` : returnText = 'no comments'
            return returnText
          }
        }

        const reservationConfirmedEmail = `
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
                min-width: 250px;
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
                  style="max-width: 150px;"
                  src="http://localhost:8000/public/images/logo_sushivill.png"
                />
              </div>
              <h1
                style="
                  font-family: roboto;
                  font-weight: bold;
                  color: #dc5a41;
                  margin-bottom: 1em;
                  margin-top: 1em;
                "
              >
                Your reservation has been confirmed!
              </h1>
              <p
                style="
                  font-size: 18px;
                  font-family: roboto;
                  line-height: 1.5em;
                  color: rgb(88, 88, 88);
                "
              >
                We've confirmed your request.<br />
                Plese let us know if there is any updates on your reservation, and
                we'll look forward to see you and serve you on ${moment(confirmedRes.reserveDate).format('LLL')}.<br />
                Thank you for choosing Sushiville.
              </p>
              <h2
                style="
                  font-family: Roboto;
                  color: darkgreen;
                  display: inline-block;
                  width: 90%;
                  border-bottom: 1px solid #dc5a41;
                "
              >
                Your confirmed reservation
              </h2>
              <table
                style="
                  border-spacing: 5px;
                  margin: 15px 0;
                  font-family: roboto;
                  color: gray;
                "
              >
                <tr>
                  <td>Reserve Name:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(confirmedRes, 'customer')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(confirmedRes, 'number')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Email:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(confirmedRes, 'email')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Reserve Time:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(confirmedRes, 'time')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td># of Party:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(confirmedRes, 'party')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Comments:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(confirmedRes, 'comments')}</span></td>
                </tr>
              </table>
              <div
                style="
                  padding-left: 5px;
                  border-bottom: 1px solid #dc5a41;
                  width: 90%;
                  margin-bottom: 2.5em;
                "
              >
                <p style="font-family: roboto; color: gray; padding-bottom: 20px;">
                  67 Orange Turnpike, Sloatsburg, NY 10974
                  <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
                </p>
              </div>
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
                min-width: 250px;
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
                This email was sent to {customer email} to update you about making a
                reservation in
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

        await sendEmail({
          to: confirmedRes.email,
          subject: `Sushiville - Reservation Confirmed, ${confirmedRes.name} - ${moment(confirmedRes.reserveDate).format('LLL')}`,
          text: reservationConfirmedEmail
        })
      }

      const confirmReservation = async () => {
        await updateDB();
        await emitRes();
        await sendConfirmResEmail();
      }

      confirmReservation();

    })

    // ----------------------------------------------- receive denied reservations
    socket.on('deniedReservation', (id) => {
      const updateDB = async () => {
        try { 
          const reservation = await Reservation.findByIdAndUpdate(id, { isDenied: true })
          await reservation.save()
        } catch (err) {
          console.log(err)
        }
      }

      const emitRes = async () => {
        await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({ updatedAt: -1}).then(result => {
          newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isD)
          return newReservations
        })
        await io.sockets.emit('Reservations', newReservations)
      }

      const sendDeniedResEmail = async () => {
        let deniedRes

        const setRes = async () => {
          deniedRes = await Reservation.findById({_id: id})
          return deniedRes
        }
        await setRes();

        const textFormatter = (reservation, text) => {
          if (text === 'customer') {
            return `${reservation.name}`
          } else if (text === 'number') {
            return `${reservation.contact}`
          } else if (text === 'email') {
            return `${reservation.email}`
          } else if (text === 'time') {
            return `${moment(reservation.reserveDate).format('LLL')}`
          } else if (text === 'party') {
            return `${reservation.totalParty} ppl`
          } else if (text === 'comments') {
            let returnText
            !!reservation.comments ? returnText = `${reservation.comments}` : returnText = 'no comments'
            return returnText
          }
        }

        const reservationDeniedEmail = `
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
                min-width: 250px;
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
                  style="max-width: 150px;"
                  src="http://localhost:8000/public/images/logo_sushivill.png"
                />
              </div>
              <h1
                style="
                  font-family: roboto;
                  font-weight: bold;
                  color: #dc5a41;
                  margin-bottom: 1em;
                  margin-top: 1em;
                "
              >
                Your reservation request has been denied...
              </h1>
              <p
                style="
                  font-size: 18px;
                  font-family: roboto;
                  line-height: 1.5em;
                  color: rgb(88, 88, 88);
                "
              >
                We've considered your reservations request, but we are unable to
                fulfill the request. <br />
                Please request again
                <a
                  style="text-decoration: none; color: #dc5a41;"
                  href="http:www.sushivilleny.com"
                  >here</a
                >, or contact us directly, (845) 712 - 5006.<br />
                Thank you for your consideration.<br />
              </p>
              <h2
                style="
                  font-family: Roboto;
                  color: darkgreen;
                  display: inline-block;
                  width: 90%;
                  border-bottom: 1px solid #dc5a41;
                "
              >
                Your Reservation Request
              </h2>
              <table
                style="
                  border-spacing: 5px;
                  margin: 15px 0;
                  font-family: roboto;
                  color: gray;
                "
              >
                <tr>
                  <td>Reserve Name:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                      >${textFormatter(deniedRes, 'customer')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(deniedRes, 'number')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Contact Email:</td>
                  <td>
                    <span style="padding-left: 15px; color: gray; font-weight: bold;"
                      >${textFormatter(deniedRes, 'email')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Reserve Time:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(deniedRes, 'time')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td># of Party:</td>
                  <td>
                    <span
                      style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                      >${textFormatter(deniedRes, 'party')}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>Comments:</td>
                  <td><span style="padding-left: 15px; color: gray;">${textFormatter(deniedRes, 'comments')}</span></td>
                </tr>
              </table>
              <div
                style="
                  padding-left: 5px;
                  border-bottom: 1px solid #dc5a41;
                  width: 90%;
                  margin-bottom: 2.5em;
                "
              >
                <p style="font-family: roboto; color: gray; padding-bottom: 20px;">
                  67 Orange Turnpike, Sloatsburg, NY 10974
                  <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
                </p>
              </div>
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
                min-width: 250px;
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
                This email was sent to {customer email} to update you about making a
                reservation in
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

        await sendEmail({
          to: deniedRes.email,
          subject: `Sushiville - Reservation Request Denial, ${deniedRes.name} - ${moment(deniedRes.reserveDate).format('LLL')}`,
          text: reservationDeniedEmail
        })
      }

      const confirmReservation = async () => {
        await updateDB();
        await emitRes();
        await sendDeniedResEmail();
      }

      confirmReservation();
    })

    // ----------------------------------------------- receive showed up reservations
    socket.on('showedupReservation', (id) => {
      const updateDB = async () => {
        try { 
          const reservation = await Reservation.findByIdAndUpdate(id, { isShowedUp: true })
          await reservation.save()
        } catch (err) {
          console.log(err)
        }
      }

      const emitRes = async () => {
        await Reservation.find({}).populate({path: 'customer', model: 'User'}).sort({ updatedAt: -1}).then(result => {
          newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isD)
          return newReservations
        })
        await io.sockets.emit('Reservations', newReservations)
      }

      const confirmReservation = async () => {
        await updateDB();
        await emitRes();
      }

      confirmReservation();
    })

    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`)
    })
  })

}
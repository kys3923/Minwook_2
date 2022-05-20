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
      console.log(order)

      let receivedOrder = order;

      const gettingDataBase = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(result => {
          newOrders = result.filter(order => !order.isFinished)
          let NewOrderNum = order.OrderNumber
          let brandNewOrder = newOrder.filter(order => order.OrderNumber == NewOrderNum)
          if (!!brandNewOrder) {
            io.sockets.emit('Orders', newOrders)
          }
          return newOrders
        })
      }

      const sendNewOrderEmail = async () => {
        // {
        //   _id: '62875dbf693b0e2078fb18b8',
        //   orderedItems: [
        //     {
        //       options: [Array],
        //       name: 'Yum Yum',
        //       price: 18.95,
        //       qty: 1,
        //       comments: '',
        //       _id: '62875dbf693b0e2078fb18b9',
        //       rollChoices: []
        //     }
        //   ],
        //   isDelivery: false,
        //   customer: '6286323ca88e85e50826302e',
        //   isConfirmed: false,
        //   isReady: false,
        //   isFinished: false,
        //   isPaid: false,
        //   isAgreed: true,
        //   isPlaced: false,
        //   isPaidAtRestaurant: true,
        //   grandTotal: 20.6318125,
        //   addOns: [],
        //   createdAt: '2022-05-20T09:22:07.806Z',
        //   updatedAt: '2022-05-20T09:23:06.603Z',
        //   OrderNumber: 10194,
        //   __v: 0,
        //   comments: ''
        // }
        let customer
        // find customer
        const findCustomer = async () => {
          customer = await User.findById({_id: receivedOrder.customer})
          return customer
        }
        await findCustomer();

        // find order
        // get order details
        // set msgs
        const textFormatter = (order, text) => {
          if (text === 'orderNumber') {
            return `${order.OrderNumber}`
          } else if (text === 'customer') {
            return `${customer.username}`
          } else if (text === 'total') {
            return `$ ${order.grandTotal.toFixed(2)}`
          } else if (text === 'date') {
            return `${moment(order.updatedAt).format('LLL')}`
          } else if (text === 'address') {
            return ' 67 Orange Turnpike, Sloatsburg, NY 10974'
          } else if (text === 'contact') {
            return '(845) 712 - 5006'
          } else {
            return 'Wrong Data Input'
          }
        }

        // send
        // sendEmail({
        //   to:
        //   subject: `Sushiville - Order #${orderNumber}`,
        //   text: 
        // })
      }

      const newOrder = async () => {
        await gettingDataBase()
      }
    })



    // ----------------------------------------------- receive confirmed orders
    socket.on('confirmOrder', (id) => {
      // receive order.id
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

      const sendEmail = async () => {
        // TODO: send email
      }

      const confirmOrder = async () => {
        await updateDB();
        await sendNewOrder();
        // await sendEmail();
      }
      
      confirmOrder()
    })

    // ----------------------------------------------- receive ready orders
    socket.on('readyToPickUp', (order) => {
      console.log('req received', order)
      // UpdateDB
      const updateDB = async () => {
        const reqId = order;
        try {
          const order = await Order.findByIdAndUpdate(reqId, {
            isReady: true
          })
          order.save(); 
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

      const readyOrder = async () => {
        await updateDB();
        await sendNewOrder();
      }
      readyOrder()
      // TODO: send email
    })

    // ----------------------------------------------- receive finished orders
    socket.on('finishOrder', (order) => {
      console.log('req received', order)
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
        console.log('req received', order)
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
          newReservations = result.filter(reservation => !reservation.isShowedUp && !reservation.isD)
          return newReservations
        })
        await io.sockets.emit('Reservations', newReservations)
      }

      const newReservation = async () => {
        await registerAndUpdateDB();
        await emitRes();
        // TODO: send email to customer
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

      const confirmReservation = async () => {
        await updateDB();
        await emitRes();
      }

      confirmReservation();
      // TODO: send confirm email to customer

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

      const confirmReservation = async () => {
        await updateDB();
        await emitRes();
      }

      confirmReservation();
      // TODO: send email
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
const Order = require('../models/Order');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const sendEmail = require('./sendEmail');

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

    // receive new orders
    socket.on('newOrder', (order) => {
      const gettingDataBase = async () => {
        await Order.find({}).populate({path: 'customer', model: 'User'}).sort({ OrderNumber: -1}).then(result => {
          newOrder = result.filter(order => !order.isFinished)
          let NewOrderNum = order.OrderNumber
          let brandNewOrder = newOrder.filter(order => order.OrderNumber == NewOrderNum)
          if (!!brandNewOrder) {
            io.sockets.emit('Orders', newOrder)
          }
          // TODO: send email to the user the order confirmation
          // Find user from User
          // set email contents
          // send email
          return newOrder
        })
      }
      gettingDataBase()
    })

    // receive new reservations
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

    // receive confirmed reservations
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

    // receive denied reservations
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
    })

    // receive showed up reservations
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

    // receive confirmed orders
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
      // Update DB =>  send NewOrder => send ConfirmedORder 

      const confirmOrder = async () => {
        await updateDB();
        await sendNewOrder();
        // await sendEmail();
      }
      
      confirmOrder()
    })

    // receive ready orders
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
    })

    // receive finished orders
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

    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`)
    })
  })

}
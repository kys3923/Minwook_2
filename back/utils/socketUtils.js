const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('./sendEmail');

exports.connection = (io) => {

  let newOrder = []
  let confirmedOrder = []
  let readyToPickUp = []

  
  io.on('connection', (socket) =>  {
    console.log('a user is connnected', socket.id)

    Order.find().then(result => {
      newOrder = result.filter(order => !order.isConfirmed && !order.isReady && !order.isFinished)
      return newOrder
    })
    Order.find().then(result => {
      confirmedOrder = result.filter(order => order.isConfirmed && !order.isReady && !order.isFinished)
      return confirmedOrder
    })
    
    socket.emit('broadcast', newOrder)
    socket.emit('confirmOrder', confirmedOrder)

    socket.on('newOrder', (order) => {
      const gettingDataBase = async () => {
        await Order.find({}).then(result => {
          newOrder = result.filter(order => !order.isConfirmed && !order.isReady && !order.isFinished)
          let NewOrderNum = order.OrderNumber
          let brandNewOrder = newOrder.filter(order => order.OrderNumber == NewOrderNum)
          if (!!brandNewOrder) {
            console.log('broadcasting...')
            socket.broadcast.emit('broadcast', newOrder)
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

    socket.on('confirmOrder', (id) => {
      // receive order.id
      console.log('req received', id);
      const sendNewOrder = async () => {
        await Order.find({}).then(orders => {
          newOrder = orders.filter(order => !order.isConfirmed && !order.isReady && !order.isFinished)
          socket.broadcast.emit('broadcast', newOrder)
        })
        return newOrder
      }

      const sendConfirmedOrder = async () => {
        await Order.find({}).then(result => {
          confirmedOrder = result.filter(order => order.isConfirmed && !order.isReady && !order.isFinished)
          socket.broadcast.emit('confirmOrder', confirmedOrder)
        })
      }

      const updateDB = async () => {
        const reqId = id;
        try {
          const order = await Order.findByIdAndUpdate(reqId, { isConfirmed: true })
          order.save();
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
        await sendConfirmedOrder();
        // await sendEmail();
      }
      
      confirmOrder()
    })

    socket.on('readyToPickUp', (order) => {
      const editOrder = async () => {
        console.log('req received', order)
      }
      editOrder()
    })

    socket.on('finishOrder', (order) => {
      const editOrder = async () => {
        console.log('req received', order)
      }
      editOrder()
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
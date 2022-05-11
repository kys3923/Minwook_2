const socketIO = require('socket.io');
const Order = require('../models/Order');
const User = require('../models/User');

exports.sio = (server) => {
  return socketIO(server, {
    transports: ['polling'],
    cors: {
      origin: 'http://localhost:3000'
    }
  })
}

exports.connection = (io) => {

  let newOrder = []
  let confirmedOrder
  let readyToPickUp

  
  io.on('connection', (socket) =>  {
    function sendHeartbeat() {
      setTimeout(sendHeartbeat, 8000);
      socket.emit('ping', { beat: 1})
    }
    
    io.sockets.on('connection', (socket) => {
      socket.on('pong', function(data) {
        console.log('pong received from client')
      })
    })

    setTimeout(sendHeartbeat, 8000)

    console.log('a user is connnected', socket.id)

    Order.find().then(result => {
      newOrder = result.filter(order => !order.isConfirmed && !order.isReady && !order.isConfirmed)
      return newOrder
    })
    
    socket.emit('broadcast', newOrder)

    socket.on('newOrder', (order) => {
      const gettingDataBase = async () => {
        await Order.find({}).then(result => {
          newOrder = result.filter(order => !order.isConfirmed && !order.isReady && !order.isConfirmed)
          let NewOrderNum = order.OrderNumber
          let brandNewOrder = newOrder.filter(order => order.OrderNumber == NewOrderNum)
          console.log(brandNewOrder, 'new order here')
          if (!!brandNewOrder) {
            console.log('broadcasting...')
            socket.broadcast.emit('broadcast', newOrder)
          }
          return newOrder
        })
      }
      gettingDataBase()
    })

    // socket.on('newOrder', (order) => {
    //   // newOrder.push(order)
    //   Order.find().then(result => {
    //     newOrder = result.filter(order => !order.isConfirmed && !order.isReady && !order.isConfirmed)
    //   })
    //   console.log(newOrder, 'received order');
    //   io.emit('newOrder', newOrder)
    // })
    
    // socket.on('confirmOrder', (order) => {
    //   console.log(order)
    // })

    // io.emit('firstEvent', 'connected to socket')

    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`)
    })
  })

}
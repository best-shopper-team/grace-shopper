const router = require('express').Router()
const {Order, User, OrderItem} = require('../db/models')
module.exports = router
// route path: api/orders

//gets all orders (only available to admins)
router.get('/', (req, res, next) => {
  Order.findAll({ include: [
    {
      model: User,
      attributes: [ 'email' ]
    }
  ]})
  .then(orders => res.json(orders))
  .catch(next)
})

//gets all orders for a specific user (can only see this if user is owner of the order or user is admin)
//this needs to be tested! with session user
router.get('/user/:userId', (req, res, next) => {
  let loggedInUserId = +req.session.passport.user
  let userId = +req.params.userId
  Order.findAll({
    where: {
      userId: userId
    }
  })
  .then(orders => {
    if (loggedInUserId === userId){
      res.json(orders)
    } else {
      User.findOne({
        where: { loggedInUserId }
      })
      .then(user => {
        if (user.isAdmin === true){
          res.json(orders)
        }
      })
    }
  })
  .catch(next)
})

//gets the 'inProcess' order for a specific user (get the cart)
router.get('/user/:userId/cart', (req, res, next) => {
  let userId = +req.params.userId
  Order.findOne({
    where: {
      userId: userId,
      status: 'inProcess'
    },
    include: [
      {model: OrderItem}
    ]
  })
  .then(cart => res.json(cart))
  .catch(next)
})

//gets all information for a specific order (can only see this if user is owner of the order or user is admin)
//this needs to be tested! with session user
router.get('/:orderId', (req, res, next) => {
  let loggedInUserId = +req.session.passport.user
  let orderId = +req.params.orderId
  Order.findOne({
    where: { orderId },
    include: [
      {model: OrderItem}
    ]
  })
  .then(order => {
    if (+order.userId === loggedInUserId){
      res.json(order)
    } else {
      User.findOne({
        where: { loggedInUserId }
      })
      .then(user => {
        if (user.isAdmin === true){
          res.json(order)
        }
      })
    }
  })
})

//POST takes an object full of order information and creates new order instance
router.post('/', (req, res, next) => {
  let newOrder = req.body
  Order.create({
    sessionId: newOrder.sessionId,
    status: newOrder.status
  })
  .then(order => {
    order.setAddress(+newOrder.addressId);
    order.setUser(+newOrder.userId);
    res.json(order)
  })
  .catch(next)
})

//PUT takes object full of updated order info and edits order
//edit: status or purchase time
router.put('/:orderId', (req, res, next) => {
  let editOrder = req.body
  let orderId = +req.params.orderId
  Order.update({
    status: editOrder.status,
    purchaseTime: editOrder.purchaseTime
  }, {
    where: {
      id: orderId
    },
    returning: true,
    plain: true
  })
  .spread((bool, updatedOrder) => {
    console.log('updated', updatedOrder)
    res.json(updatedOrder)})
  //nice to have:
  // .then(updatedOrder => {
  //   if (editOrder.addressId){
  //     updatedOrder.setAddress(+editOrder.addressId);
  //   }
  //   if (editOrder.userId){
  //     updatedOrder.setUser(+editOrder.userId);
  //   }
  //   res.json(updatedOrder)
  // })
  .catch(next)
})

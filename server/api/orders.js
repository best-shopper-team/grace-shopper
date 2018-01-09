const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router
// route path: api/orders

//gets all orders (only available to admins)
router.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next)
})

//gets all orders for a specific user
router.get('/user/:userId', (req, res, next) => {
  let userId = +req.params.userId
  Order.findAll({
    where: {
      userId: userId
    }
  })
  .then(orders => res.json(orders))
  .catch(next)
})

//gets the 'inProcess' order for a specific user (get the cart)
router.get('/user/:userId/cart', (req, res, next) => {
  let userId = +req.params.userId
  Order.findOne({
    where: {
      userId: userId,
      status: 'inProcess'
    }
  })
  .then(cart => res.json(cart))
  .catch(next)
})

//gets all information for a specific order (can only see this if user is owner of the order or user is admin)
router.get('/:orderId', (req, res, next) => {
  let userId = +req.session.passport.user //need to test if this is correct way to get userId
  let orderId = +req.params.orderId
  Order.findOne({
    where: { orderId }
  })
  .then(order => {
    if (+order.userId === userId){
      res.json(order)
    } else {
      User.findOne({
        where: { userId }
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
    where: {
      newOrder
    }
  })
  .then(order => res.json(order))
  .catch(next)
})

//PUT takes object full of updated order info and edits order
//edit: status or purchase time
router.put('/:orderid', (req, res, next) => {
  let editOrder = req.body
  let orderId = +req.params.orderId
  Order.update({ editOrder }, {
    where: { orderId },
    returning: true,
    plain: true
  })
  .then(updatedOrder => res.json(updatedOrder))
  .catch(next)
})

const router = require('express').Router()
const {Order, User, OrderItem, Address, Product} = require('../db/models')
module.exports = router
// route path: api/orders



//gets all orders for a specific user (can only see this if user is owner of the order or user is admin)
//this needs to be tested! with session user
router.get('/user/:userId', (req, res, next) => {
  let loggedInUserId = +req.session.passport.user
  let userId = +req.params.userId
  Order.findAll({
    where: {
      userId: userId
    },
    include: [
      {model: OrderItem}
    ]
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

//gets the 'inProcess' order for a specific user (get the cart by userid)
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

//gets the 'inProcess' order for a specific session (get the cart based on sessionId)
router.get('/session/cart', (req, res, next) => {
  let sessionId = req.sessionID
  Order.findOne({
    where: {
      sessionId: sessionId,
      status: 'inProcess'
    },
    include: [
      {model: OrderItem}
    ]
  })
  .then(cart => {
    res.json(cart)})
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
//for user
router.post('/user', (req, res, next) => {
  let newOrder = req.body
  Order.findOrCreate({where: {
    userId: +req.body.userId,
    status: 'inProcess'
  }})
  .spread((instance, createdBool) => {
    let newOrderitem = {
      quantity: +req.body.orderItem.quantity,
      productId: +req.body.orderItem.productId,
      itemPrice: +req.body.orderItem.itemPrice,
      orderId: +instance.id
    }
    OrderItem.create(newOrderitem) //this should eventually be a findOrCreate to prevent multiple rows in OrderItem for the same orderId and productId
    .then(newItem => console.log('new', newItem))
    .catch(err => console.log(err))
  })
  .then(order => res.json(order))
  // .then(order => {
  //   order.setAddress(+newOrder.addressId);
  //   order.setUser(+newOrder.userId);
  //   res.json(order)
  // })
  .catch(next)
})

//POST takes an object full of order information and creates new order instance
//for SESSION
router.post('/session', (req, res, next) => {
  let newOrder = req.body
  Order.findOrCreate({where: {
    sessionId: req.sessionID,
    status: 'inProcess'
  }})
  .spread((instance, createdBool) => {
    let newOrderitem = {
      quantity: +req.body.orderItem.quantity,
      productId: +req.body.orderItem.productId,
      itemPrice: +req.body.orderItem.itemPrice,
      orderId: +instance.id
    }
    return Promise.all([
      OrderItem.create(newOrderitem), //this should eventually be a findOrCreate to prevent multiple rows in OrderItem for the same orderId and productId
      instance
    ])
    .then(([newItem, theOrder]) => {
      res.json(theOrder)})
    .catch(next)
  })
})

//PUT takes object full of updated order info and edits order
//edit: status or purchase time (for admin)
router.put('/:orderId', (req, res, next) => {
  let editOrder = req.body
  let orderId = +req.params.orderId

  //axios.get('/api/email/update')
  Order.findOne({where: {id: req.params.orderId}})
  .then(foundOrder => {
  return foundOrder.update({
    status: editOrder.status,
    purchaseTime: editOrder.purchaseTime
    })
  })
  .then((updatedOrder) => {
    return res.json(updatedOrder)})
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

//SUBMIT CART
//PUT takes object full of cart info and address info and updates order from inProcess => submitted, updates purchaseTime, and sets address on the order
//also subtracts inventory from orderitems, once order has been submitted
router.put('/cart/:cartId', (req, res, next) => {
  let address = req.body.address
  let orderitems = req.body.cart.orderitems
  let cartId = +req.params.cartId
  Address.create(address)
  .then(newAddress => {
    let updatedCart = {
      status: 'submitted',
      purchaseTime: new Date(),
      addressId: newAddress.id
    }
    Order.update(updatedCart, {
      where: {
        id: cartId
      },
      returning: true,
      plain: true
    })
    .spread((bool, updatedOrder) => {
      orderitems.forEach((orderitem) => {
        let quantityOrdered = +orderitem.quantity
        Product.findOne({
          where: {
            id: orderitem.productId
          }
        })
        .then(product => {
          let newQuantity = product.quantity - quantityOrdered
          Product.update({
            quantity: newQuantity
          }, {
            where: {
              id: product.id
            }
          })
        })
      })
      res.json(updatedOrder)})
    .catch(next)
  })
})

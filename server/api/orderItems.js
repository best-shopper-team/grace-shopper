const router = require('express').Router()
const { OrderItem } = require('../db/models')


// /api/orderItems/order/:orderId
router.post('/order/:orderId', (req, res, next) => {
  OrderItem.create({
    quantity: req.body.quantity,
    itemPrice: req.body.itemPrice
  })
  .then(newOrderItem => {
    return newOrderItem.setOrder(req.params.orderId)
  })
  .then(newOrderItem => {
    return newOrderItem.setProduct(req.body.productId)
  })
  .then(newOrderItem => {
    res.status(200).json(newOrderItem)
  })
  .catch(next)
})

// /api/orderItems/:orderItemId
router.put('/:orderItemId/', (req, res, next) => {
  OrderItem.update(req.body, {
    where: {id: +req.params.orderItemId},
    returning: true,
    plain: true,
  })
  .then((result) => {
    res.status(200).json(result)
  })
  // REVIEW: commented out code? please explain
  // .then(([numRows, rows]) => {
  //   console.log(rows.dataValues)
  //   res.status(200).json(rows.dataValues)
  // })
  .catch(next)
})

// /api/orderItems/:orderItemId
router.delete('/:orderItemId', (req, res, next) => {
  OrderItem.destroy({
    where: {id: req.params.orderItemId}
  })
  .then(numAffectedRows => {
    res.status(200).json(numAffectedRows)
  })
})


module.exports = router;

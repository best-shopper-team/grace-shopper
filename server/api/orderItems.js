const router = require('express').Router()
const { OrderItem } = require('../db/models')


// /api/orderItems/order/:orderId
router.post('/order/:orderId', async (req, res, next) => {
  try {
    const newOrderItem = await OrderItem.create({
      quantity: req.body.quantity,
      itemPrice: req.body.itemPrice
    })
    await newOrderItem.setOrder(req.params.orderId)
    await newOrderItem.setProduct(req.body.productId)
    res.status(200).json(newOrderItem)
  }
  catch (error) {
    next(error)
  }
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

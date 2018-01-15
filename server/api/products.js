const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// returns all products
router.get('/', (req, res, next) => {
  Product.findAll({include: [{model: Category}]})
    .then(products => res.json(products))
    .catch(next)
})

// returns one product
router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId
    },
    include: [
      {model: Category}
    ]
  })
    .then(product => res.json(product))
    .catch(next)
})

//editing a product is ADMIN ONLY

//creating a new product is ADMIN ONLY

//deleting a product is ADMIN ONLY

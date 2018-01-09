const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// returns all products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

// returns one product
router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

// creates new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.json(newProduct))
    .catch(next)
})

// updates a product
router.put('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId
    }
  })
    .then(foundProduct => foundProduct.update(req.body))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next)
})

// deletes a product
router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
    .then(() => res.status(204).send())
    .catch(next)
})

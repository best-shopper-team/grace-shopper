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
    .then(newProduct => {
      if (req.body.categories && req.body.categories.length){
        /*NOTE: this will return a promise for the new instance on
`        the prod-cat, NOT the newProduct*/
        return newProduct.setCategories(req.body.categories)
      }
      return newProduct
    })
    /*NOTE: response is either the new instance on
`        OR the newProduct, maybe we can fix this later*/
    .then(response => res.status(200).json(response))
    .catch(next)
})

// updates a product
/*NOTE: If you pass an empty array as req.body.categories,
all the existing categories will be removed from this product*/
router.put('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId
    }
  })
    .then(foundProduct => foundProduct.update(req.body))
    .then(updatedProduct => {
      if (req.body.categories){
        /*NOTE: this will return a promise for the new instance on
`        the prod-cat, NOT the newProduct*/
        return updatedProduct.setCategories(req.body.categories)
      }
      return updatedProduct
    })
    /*NOTE: response is either the new instance on
`   OR the newProduct, OR the number of categories removed
    from the product maybe we can fix this later*/
    .then(response => res.json(response))
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

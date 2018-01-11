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
/*NOTE: this will return either the new instance on
`        OR the newProduct, maybe we can fix this later*/
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: +req.body.price,
      quantity: +req.body.quantity,
      isAvailable: req.body.isAvailable,
      photoUrl: req.body.photoUrl,
      categories: req.body.categories
    })
    if (req.body.categories && req.body.categories.length){
        /*NOTE: this will return a promise for the new instance on
`        the prod-cat, NOT the newProduct*/
        const productWithCategories = await newProduct.setCategories(req.body.categories)
        res.json(productWithCategories)
      } else {
        res.json(newProduct)
      }
  }
  catch (error) {
    next(error)
  }
})

// updates a product
/*NOTE: response is either the new instance on
`   OR the newProduct, OR the number of categories removed
from the product maybe we can fix this later*/

/*NOTE: If you pass an empty array as req.body.categories,
all the existing categories will be removed from this product.
Make sure req.body.categories includes EXACTLY the categories
that you want on the updated product*/
router.put('/:productId', async (req, res, next) => {
  try {
    const foundProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    const updatedProduct = await foundProduct.update(req.body)
      if (req.body.categories){
        /*NOTE: this will return a promise for the new instance on
  `        the prod-cat, NOT the newProduct*/
        const updatedProdWithCategories = updatedProduct.setCategories(req.body.categories)
        res.json(updatedProdWithCategories)
      }
      res.json(updatedProduct)
  }
  catch (error) {
    next(error)
  }
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

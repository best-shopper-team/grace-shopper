const router = require('express').Router()
const {Order, User, OrderItem, Address, Product, Category, Review} = require('../db/models')
module.exports = router

//gets complete order history of all users
router.get('/orders', (req, res, next) => {
  Order.findAll({ include: [
    {
      model: Address,
      attributes: [ 'email' ]
    }
  ]})
  .then(orders => res.json(orders))
  .catch(next)
})


//accepts req.body with category name
//and finds or creates a new instance
router.post('/categories', (req, res, next) => {
  let name = req.body.name
  Category.findOrCreate({
    where: {name}
  })
  .spread((category, createdBool) => {
    res.json(category)
  })
  .catch(next)
})


// creates new product
/*NOTE: this will return either the new instance on
`        OR the newProduct, maybe we can fix this later*/
router.post('/products', async (req, res, next) => {
  const newProductInfo = {
    title: req.body.title,
    description: req.body.description,
    price: +req.body.price,
    quantity: +req.body.quantity,
    isAvailable: req.body.isAvailable,
    categories: req.body.categories
  }
  if (req.body.photoUrl){
    newProductInfo.photoUrl = req.body.photoUrl
  }

  try {
    const newProduct = await Product.create(newProductInfo)
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

/*NOTE: If you pass an empty array as req.body.categories,
all the existing categories will be removed from this product.
Make sure req.body.categories includes EXACTLY the categories
that you want on the updated product*/
router.put('/products/:productId', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    const foundProduct = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    const updatedProduct = await foundProduct.update(
      {
        title: req.body.title,
        description: req.body.description,
        price: +req.body.price,
        quantity: +req.body.quantity,
        isAvailable: req.body.isAvailable,
        photoUrl: req.body.photoUrl
      })
      if (req.body.categories){
        /*NOTE: this will return a promise for the new instance on
  `        the prod-cat, NOT the newProduct*/
        const updatedProdWithCategories = updatedProduct.setCategories(req.body.categories)
        res.json(updatedProdWithCategories)
      } else {
        res.json(updatedProduct)
      }
  }
  catch (error) {
    next(error)
  }
})


// deletes a product
router.delete('/products/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
    .then(() => res.status(204).send())
    .catch(next)
})


// deletes one review
router.delete('/reviews/:reviewId', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.reviewId
    }
  })
    .then(() => res.status(204).send())
    .catch(next)
})


// updates one user
router.put('/users/:userId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(foundUser => foundUser.update(req.body))
    .then(updatedUser => res.send(updatedUser))
    .catch(next)
})

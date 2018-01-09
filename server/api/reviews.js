const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/products/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next)
})


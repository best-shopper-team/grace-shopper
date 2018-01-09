const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

// return all reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

// returns reviews for one product
router.get('/product/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
    .then(foundReviews => res.json(foundReviews))
    .catch(next)
})

// creates new review
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(newReview => res.json(newReview))
    .catch(next)
})

// deletes one review
router.delete('/:reviewId', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.reviewId
    }
  })
    .then(() => res.status(204).send())
    .catch(next)
})

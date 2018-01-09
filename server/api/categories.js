const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router
// route path: api/categories

//gets all categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

//accepts req.body with category name
//and finds or creates a new instance
router.post('/', (req, res, next) => {
  let name = req.body.name
  Category.findOrCreate({
    where: {name}
  })
  .spread((category, createdBool) => {
    res.json(category)
  })
  .catch(next)
})

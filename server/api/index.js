const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/orderItems', require('./orderItems'))
router.use('/email', require('./email'))

//middleware to stop non-admins from hitting admin routes
router.use('/admin', (req, res, next) => {
  if (req.user.isAdmin){
    next()
  }
  else {
    next('you must be an admin to access this api route!')
  }
})


router.use('/admin', require('./admin'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

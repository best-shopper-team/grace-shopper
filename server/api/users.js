const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// return all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'name', 'isAdmin', 'isActive', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// updates one user
router.put('/:userId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(foundUser => foundUser.update(req.body))
    .then(updatedUser => res.send(updatedUser))
    .catch(next)
})

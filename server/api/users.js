const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// return all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'name', 'isAdmin', 'isActive', 'email', 'passwordReset']
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
  // REVIEW: review params here
  // req.body === { isAdmin: true }
    .then(foundUser => foundUser.update({
      username: req.body.username,
      favoriteColor: req.body.favoriteColor,
    }))
    // maybe tedious, let's go shopping, for _
    foundUser.update(_.pluck(req.body, 'username', 'password', 'favoriteColor'))
    // or...
    foundUser.update(_.pluck(req.body, User.validUpdateParams))
    .then(updatedUser => res.send(updatedUser))
    .catch(next)
})

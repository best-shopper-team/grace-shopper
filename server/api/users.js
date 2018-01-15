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


//updating a user is ADMIN only

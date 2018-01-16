const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => {
          if (err) {
            next(err)
          } else {
            let sessionId = req.sessionID
            Order.findOne({
              where: {
                sessionId,
                status: 'inProcess'
              }
            })
            .then(order => {
              if (order){
                return order.update({
                  sessionId: null,
                  userId: user.id
                })
              }
            })
            res.json(user)
          }
        })
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) {
          next(err)
        } else {
          let sessionId = req.sessionID
          Order.findOne({
            where: {
              sessionId,
              status: 'inProcess'
            }
          })
          .then(order => {
            if (order){
              return order.update({
                sessionId: null,
                userId: user.id
              })
            }
          })
          res.json(user)
        }
      })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

//this is the version just for making a new password. not admin only.
router.put('/users/:userId', (req, res, next) => {
  console.log('id???', req.params.userId);
  console.log('password???', req.body)
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(foundUser => {
      console.log('found user from api', foundUser)
      return foundUser.update({
        password: req.body.password,
        passwordReset: false
      }, {
        returning: true,
        plain: true
      })
    })
    .then(updatedUser => {
      console.log('updated user????', updatedUser)
      res.send(updatedUser)
    })
    .catch(next)
})



router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})


router.use('/google', require('./google'))

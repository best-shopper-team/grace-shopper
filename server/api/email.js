const router = require('express').Router()
module.exports = router
let nodemailer = require('nodemailer')


const senderEmailAddress = 'lifesocks@yahoo.com'
const customerServiceEmailAddress = 'help@lifesocks.com'
const customerServiceEmailAddress = 'help@lifesocks.com'

let transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    // REVIEW: don't keep secrets in source
    // when this is removed from source, the password should be reset
    user: 'lifesocks@yahoo.com',
    pass: 'best-shopper-team'
  }
})

// keep below for potential testing after deployment:

// let mailOptions = {
//   from: '"Life Socks" <lifesocks@yahoo.com',
//   to: 'alyssavenere@gmail.com',
//   subject: 'Testing out this nodemailer thang.',
//   text: 'Supposedly this is gonna be easy?'
// }


const config = require('../../../config')
// REVIEW: HTML Email? Templates?
router.post('/confirmation', (req, res, next) => {
  transporter.sendMail({
    // the from email could live in a config file
    from: '"Life Socks" <lifesocks@yahoo.com',
    to: req.body.email,
    subject: 'We have received your order!',
    text: 'Thank you for shopping with Life Socks! We have received your order and will be shipping it shortly. Our name may be pessimistic, but we are all smiles about delivering the best product possible. Please let us know if you have any questions! :)'
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('EMAIL SENT: ' + info.response)
    }
  })
})

router.post('/update', (req, res, next) => {
  transporter.sendMail({
    from: '"Life Socks" <lifesocks@yahoo.com',
    to: req.body.email,
    subject: 'Your order has shipped!',
    text: 'Thank you for shopping with Life Socks! Your order has shipped. Our name may be pessimistic, but we are all smiles about delivering the best product possible. Please let us know if you have any questions! :)'
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('EMAIL SENT: ' + info.response)
    }
  })
})

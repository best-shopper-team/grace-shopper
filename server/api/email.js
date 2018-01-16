const router = require('express').Router()
module.exports = router
let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lifesocksshopper@gmail.com',
    pass: 'best-shopper-team'
  }
})

router.post('/confirmation', (req, res, next) => {
  let recipient = req.body.email
  transporter.sendMail({
    from: 'lifesocksshopper@email.com',
    to: recipient,
    subject: 'We have received your order!',
    html: '<h3>Thank you for shopping with Life Socks!</h3><p>We have received your order and will be shipping it shortly. Our name may be pessimistic, but we are all smiles about delivering the best product possible. Please let us know if you have any questions! :)</p>'
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
    from: 'lifesocksshopper@email.com',
    to: 'delta.love66@gmail.com',
    subject: 'Your order has shipped!',
    html: '<h3>Thank you for shopping with Life Socks! Your order has shipped! </h3><p>Our name may be pessimistic, but we are all smiles about delivering the best product possible. Please let us know if you have any questions! :)</p>'
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('EMAIL SENT: ' + info.response)
    }
  })
})

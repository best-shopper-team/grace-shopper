const Sequelize = require('sequelize')
const db = require('../db')
let nodemailer = require('nodemailer')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM('inProcess', 'submitted', 'shipped', 'cancelled'),
    defaultValue: 'inProcess'
  },
  purchaseTime: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  }
})

module.exports = Order


/**
 * hooks
 */

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
   user: 'lifesocksshopper@gmail.com',
   pass: 'best-shopper-team'
 }
})


const sendShippingEmail = order => {
  if (order.previous('status') === 'submitted' && order.status === 'shipped'){
    console.log('im going to send an email!!')
    return order.getAddress()
    .then(address => {
    return transporter.sendMail({
        from: 'lifesocksshopper@email.com',
        to: address.email,
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
  }
}

Order.beforeUpdate(sendShippingEmail)

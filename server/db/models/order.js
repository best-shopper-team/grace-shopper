const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('inProcess', 'submitted', 'shipped', 'cancelled')
  },
  purchaseTime: {
    type: Sequelize.DATE
  }
})

module.exports = Order

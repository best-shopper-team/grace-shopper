const Sequelize = require('sequelize')
const db = require('../db')

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

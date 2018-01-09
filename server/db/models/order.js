const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.INTEGER,
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

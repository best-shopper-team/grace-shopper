const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  itemPrice: {
    type: Sequelize.INTEGER
  },
  getterMethods: {
    itemTotal() {
      return this.quantity * this.itemPrice;
    }
  }
})

module.exports = OrderItem

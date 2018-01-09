const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderitem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  itemPrice: {
    type: Sequelize.INTEGER
  }
}, {
    getterMethods: {
      itemTotal() {
        return this.getDataValue('quantity') * this.getDataValue('itemPrice')
      }
    }
  })

module.exports = OrderItem

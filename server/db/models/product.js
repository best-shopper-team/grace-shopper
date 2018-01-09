
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    len: [1, 25]
  },
  desription: {
    type:   Sequelize.TEXT,
    len: [1, 50]
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue:' https://cdn.shopify.com/s/files/1/2607/2780/products/socks-template.jpg?v=1512403868'
  }
})

module.exports = Product;

/**
 * instanceMethods
 */
Product.prototype.priceDollars  = function () {
  const dollarPrice = this.price / 200;
  return dollarPrice;
}

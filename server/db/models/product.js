
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  description: {
    type:   Sequelize.TEXT,
    validate: {
      len: [0, 400]
    }
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
    defaultValue: 'https://i.imgur.com/oivDaDN.png'
  }
})

module.exports = Product;

/**
 * instanceMethods
 */
Product.prototype.priceDollars  = function () {
  const dollarPrice = this.price / 100;
  return dollarPrice;
}

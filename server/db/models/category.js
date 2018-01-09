const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    validate: {
      len: [2, 15]
    },
    allowNull: false,
    unique: true
  }
})

module.exports = Category;

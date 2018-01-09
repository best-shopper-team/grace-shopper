
const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    len: [4, 300]
  }, //minimum length
  rating: {
    type:   Sequelize.ENUM,
    values: [1, 2, 3, 4, 5],
    allowNull: false
  }
})

module.exports = Review;

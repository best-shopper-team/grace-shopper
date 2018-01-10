
const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('Session', {
  sid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  expires: Sequelize.DATE,
  data: Sequelize.JSON
})

module.exports = Session;

require('dotenv').config()

// import the Sequelize constructor from the library
const Sequelize = require('sequelize')

// create connection to database, pass in protected MySQL information for database name, username, and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

module.exports = sequelize

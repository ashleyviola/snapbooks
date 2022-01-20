// import bcrypt for hashing passwords and verifying credentials
const bcrypt = require('bcrypt')

// import Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword (loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    // set up hooks/lifecycle events here (functions called before and after calls in sequelize are executed)
    // using hooks here to hash passwords before they enter the database
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate (newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate (updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        return updatedUserData
      }
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
)

// export the newly created model to be used in other parts of the app
module.exports = User

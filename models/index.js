// required files
const User = require('./User')
const Client = require('./Client')
const Project = require('./Project')

// relationships
// User has many Clients
User.hasMany(Client, {
  foreignKey: 'user_id'
})

// Client belongs to User
Client.belongsTo(User, {
  foreignKey: 'user_id'
})

// Client has many Project
Client.hasMany(Project, {
  foreignKey: 'client_id'
})

// Project belongs to Client
Project.belongsTo(Client, {
  foreignKey: 'client_id'
})

// exports
module.exports = { User, Client, Project }

const seedUsers = require('./user-seeds')
const seedClients = require('./client-seeds')
const seedProjects = require('./project-seeds')

const sequelize = require('../config/connection')

const seedAll = async () => {
  // force: true will drop and recreate tables and their associations
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')
  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n')

  await seedClients()
  console.log('\n----- CLIENTS SEEDED -----\n')

  await seedProjects()
  console.log('\n----- PROJECTS SEEDED -----\n')

  process.exit(0)
}

seedAll()

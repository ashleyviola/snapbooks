const { User } = require('../models')

// passwords here do not need to be hashed because this emulates what the user is sending before their account is created
const userData = [
  {
    username: 'Sal.E.Maker03',
    email: 'saleabration03@mailinator.com',
    password: 'money!5mymiddl3name'
  },
  {
    username: 'ImaYesMan007',
    email: 'i.heart.projects1997@mailinator.com',
    password: 'aProject.shakenNOTstirred'
  },
  {
    username: 'there\'s.a.folder.for.that',
    email: 'oddly-satisfying-organization@mailinator.com',
    password: 'make!tN3at'
  }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers

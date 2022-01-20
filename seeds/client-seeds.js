const { Client } = require('../models')

const clientData = [
  {
    company_name: 'Dodgeball Emporium',
    address: '800 Curvesta Ln.',
    city: 'Duckville',
    state: 'AZ',
    zip: '85356',
    contact_first_name: 'Patches',
    contact_last_name: 'O\'Houlihan',
    email: 'trains-with-wrenches@mailinator.com',
    phone_number: '4401239876',
    user_id: 2
  },
  {
    company_name: 'Madmartigan Hiking Co.',
    address: '1988 Nockmaar Rd.',
    city: 'Nelwyn',
    state: 'OH',
    zip: '43365',
    contact_first_name: 'Willow',
    contact_last_name: 'Ufgood',
    email: 'sorcerer-to-be@mailinator.com',
    phone_number: '6708911000',
    user_id: 1
  },
  {
    company_name: 'TIGHT Tights Clothing Company',
    address: '993 Brooks Dr.',
    city: 'Loxley',
    state: 'NY',
    zip: '10080',
    contact_first_name: 'Robin',
    contact_last_name: 'Elwes',
    email: 'r-me-seams-straight@mailinator.com',
    phone_number: '2303300330',
    user_id: 3
  },
  {
    company_name: 'Sharptooth Excavation, LLC.',
    address: '1787 Dusty Rd.',
    city: 'Woodbury Creek',
    state: 'NJ',
    zip: '08096',
    contact_first_name: 'Caspar',
    contact_last_name: 'Wistar',
    email: 'mission.imfossilble@mailinator.com',
    phone_number: '5174620000',
    user_id: 3
  },
  {
    company_name: 'Home Alone Security',
    address: '199 Mervhar Dr.',
    city: 'Winnetka',
    state: 'IL',
    zip: '60043',
    contact_first_name: 'Kevin',
    contact_last_name: 'McAlister',
    email: 'keviiinnnnn!!!@mailinator.com',
    phone_number: '5401236789',
    user_id: 2
  }
]

const seedClients = () => Client.bulkCreate(clientData)

module.exports = seedClients

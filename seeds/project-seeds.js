const { Project } = require('../models')

const projectData = [
  {
    project_name: 'Madmartigan Mobile App',
    description: 'Create a mobile app for tracking hike data.',
    cost: 2375,
    project_order_number: null,
    status: 'New',
    client_id: 2
  },
  {
    project_name: 'Remote Connections',
    description: 'Enable remote security system interactivity such as arming and disarming.',
    cost: 1800,
    project_order_number: 101,
    status: 'In Progress',
    client_id: 5
  },
  {
    project_name: 'Duck Pond',
    description: 'Install a duck pond for training purposes.',
    cost: 15000,
    project_order_number: 102,
    status: 'In Progress',
    client_id: 1
  },
  {
    project_name: 'User Authentication',
    description: 'Enable user authentication in app for tracking hikes.',
    cost: 5000,
    project_order_number: 103,
    status: 'In Progress',
    client_id: 2
  },
  {
    project_name: 'Internal Chat Feature',
    description: 'Add an internal chat feature to software for discussions.',
    cost: 6405,
    project_order_number: 104,
    status: 'In Progress',
    client_id: 3
  },
  {
    project_name: 'Dodge-Dip-Duck-Dive-Dodge',
    description: 'Create workflow to push training schedules to team members.',
    cost: 400,
    project_order_number: null,
    status: 'New',
    client_id: 1
  },
  {
    project_name: 'Paleontology Portal',
    description: 'Create Portal for paleontologists to log discoveries, potential sites, etc.',
    cost: 85000,
    project_order_number: 105,
    status: 'In Progress',
    client_id: 4
  },
  {
    project_name: 'Customer Relationship Management Software Migration',
    description: 'Migrate existing customer data to new software system.',
    cost: 150799,
    project_order_number: null,
    status: 'New',
    client_id: 3
  }
]

const seedProjects = () => Project.bulkCreate(projectData)

module.exports = seedProjects

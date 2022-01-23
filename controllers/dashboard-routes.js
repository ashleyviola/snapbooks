// setup routes with express.js and sequelize
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Client } = require('./../models');
// include authentication for users
const withAuth = require('../utils/auth');

// get all clients and projects for dashboard
router.get('/', withAuth, (req, res) => {
  // find all clients and their related projects
  Client.findAll({
    // only include data available to logged in user
    where: {
      user_id: req.session.user_id
    },
    // client information
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
    include: {
      model: Project,
      // project information
      attributes: ['id', 'project_name', 'description', 'cost', 'project_order_number', 'status', 'client_id']
    }
  })
    .then(dbClientData => {
      // get username
      const username = req.session.username;
      // serialize Sequelize response to only properties we need
      const serializedClients = dbClientData.map(clients => clients.get({ plain: true }));
      // render user dashboard with clients
      res.render('dashboard', { serializedClients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get client list
router.get('/clients', withAuth, (req, res) => {
  // find all clients and their related projects
  Client.findAll({
    // only include data available to logged in user
    where: {
      user_id: req.session.user_id
    },
    // client information
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id']
  })
    .then(dbClientData => {
      // serialize Sequelize response to only properties we need
      const clients = dbClientData.map(clients => clients.get({ plain: true }));
      // render client list page
      res.render('clients', { clients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single client
router.get('/clients/:id', (req, res) => {
  // find only a single client based on given id
  Client.findOne({
    // use id supplied as parameter
    where: {
      id: req.params.id
    },
    // client information
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
  })
    .then(dbClientData => {
      // if no clients found return error message
      if (!dbClientData) {
        res.status(404).json({ message: 'No client found with this id' });
        return;
      }
      // store client data
      const client = dbClientData.get({ plain: true });
      // render single client page and require user to be logged in
      res.render('single-client', {
        client,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get client creation page using authentication
router.get('/create-client', withAuth, (req, res) => {
  // find all clients and their related projects
  Client.findAll({
    where: {
      // only include data available to logged in user
      user_id: req.session.user_id
    },
    // client information
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
    include: {
      model: Project,
      // project information
      attributes: ['id', 'project_name', 'description', 'cost', 'project_order_number', 'status', 'client_id']
    }
  })
    .then(dbClientData => {
      // get username
      const username = req.session.username;
      // serialize Sequelize response to only properties we need
      const serializedClients = dbClientData.map(clients => clients.get({ plain: true }));
      // destructure company_name and projects from applicable clients
      const clients = serializedClients.map(({ company_name, projects: [{ project_name }] }) => ([
        company_name,
        [project_name]
      ]));
      // render client creation page using client data and require user to be logged in
      res.render('create-client', { clients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get project list - enhancement
router.get('/projects/', withAuth, (req, res) => {
  // find all projects and their related clients
  Project.findAll({
    // project information
    attributes: [
      "id",
      "project_name",
      "description",
      "cost",
      "project_order_number",
      "status",
      "client_id"
    ], include: {
      model: Client,
      // client information, only need company name
      attributes: ['company_name']
    }
  })
    .then(dbProjectData => {
      // serialize Sequelize response to only properties we need
      const project = dbProjectData.map(projects => projects.get({ plain: true }));
      // render projects-list view and require user to be logged in
      res.render('projects-list', { project, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single project - enhancement
router.get("/projects/:id", (req, res) => {
  // find only a single client based on given id
  Project.findOne({
    where: {
      // use id supplied as parameter
      id: req.params.id
    },
    // project information
    attributes: [
      "id",
      "project_name",
      "description",
      "cost",
      "project_order_number",
      "status",
      "client_id"
    ]
  })
    .then((dbProjectData) => {
      // if no project is found
      if (!dbProjectData) {
        res.status(404).json({ message: "No project found with this id" });
        return;
      }
      // store project information
      const project = dbProjectData.get({ plain: true });
      // render single project page and require user to be logged in
      res.render('single-project', { project, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create project
router.get('/create-project', withAuth, (req, res) => {
  // find all clients and their related projects
  Client.findAll({
    where: {
      // only include data available to logged in user
      user_id: req.session.user_id
    },
    // client information
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
    include: {
      model: Project,
      // project information
      attributes: ['id', 'project_name', 'description', 'cost', 'project_order_number', 'status', 'client_id']
    }
  })
    .then(dbClientData => {
      // serialize Sequelize response to only properties we need
      const clients = dbClientData.map(clients => clients.get({ plain: true }));
      // render project creation page and require user to be logged in
      res.render('create-project', { clients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

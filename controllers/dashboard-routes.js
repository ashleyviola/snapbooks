const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Client } = require('./../models');
const withAuth = require('../utils/auth');

// get all clients and projects for dashboard
router.get('/', withAuth, (req, res) => {
  Client.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
    include: {
      model: Project,
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
      res.render('dashboard', { clients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get client list
router.get('/clients', withAuth, (req, res) => {
  Client.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id']
  })
    .then(dbClientData => {
      // get username
      // const username = req.session.username;
      // serialize Sequelize response to only properties we need
      const clients = dbClientData.map(clients => clients.get({ plain: true }));

      res.render('clients', { clients, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single client
router.get('/clients/:id', (req, res) => {
  Client.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'company_name', 'address', 'city', 'state', 'zip', 'contact_first_name', 'contact_last_name', 'email', 'phone_number', 'user_id'],
  })
    .then(dbClientData => {
      if (!dbClientData) {
        res.status(404).json({ message: 'No client found with this id' });
        return;
      }

      const client = dbClientData.get({ plain: true });

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

// get project list - enhancement
// first get userid from session
// find clients like dashboard
// then find clients for those projects
router.get('/projects/', withAuth, (req, res) => {

  Project.findAll({
    where: {
      user_id: req.session.user_id
    },
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
    .then(dbProjectData => {
      // get username
      const username = req.session.username;
      // serialize Sequelize response to only properties we need
      const serializedProjects = dbProjectData.map(projects => projects.get({ plain: true }));
      // destructure company_name and projects from applicable clients
      const project = serializedProjects.map(({ project_name }) => ([[project_name]]));
      res.render('projects-list', { project, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single project - enhancement
router.get("/projects/:id", (req, res) => {
  Project.findOne({
    where: {
      user_id: req.session.user_id
    },
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
      if (!dbProjectData) {
        res.status(404).json({ message: "No project found with this id" });
        return;
      }
      const project = dbProjectData.get({ plain: true });
      res.render('single-project', { project, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

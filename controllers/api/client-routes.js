const router = require('express').Router();
const { User, Project, Client } = require('../../models');

// get all clients
router.get('/', (req, res) => {
  res.send("client routes...");
});

// get one client by id

// create client

module.exports = router;

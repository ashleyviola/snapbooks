// setup routes with express.js and sequelize
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Client } = require("../models");

// get homepage
router.get('/', (req, res) => {
  // render the homepage
  res.render('homepage');
});

// get user login
router.get('/login', (req, res) => {
  // check if user is logged in
  if (req.session.loggedIn) {
    // if logged in, redirect user to dashboard
    res.redirect('/dashboard');
    return;
  }

  // if logged out, render the login and user creation page
  res.render('login');
});

// get user logout
router.get('/logout', (req, res) => {
// render the user logout page
  res.render('logout');

});
module.exports = router;

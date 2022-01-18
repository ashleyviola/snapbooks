const router = require('express').Router();
const { User, Project, Client } = require('./../models');

// get all clients and projects for dashboard
// router.get('/', withAuth, (req, res) => {
// renders dashboard page
router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
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
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get client list
// render client list
// looks same as dashboard but no include model project portion
// res.render look in views folder for the page clients

// get a single client
// renders single client page
// similar to home routes in module
// router.get('/clients/:id', (req, res) => {...

// get project list - enhancement
// first get userid from session
// find clients like dashboard
// then find clients for those projects

// get a single project - enhancement
// renders project overview

module.exports = router;

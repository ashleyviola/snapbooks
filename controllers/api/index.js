// setup routes with express.js and sequelize
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const projectRoutes = require('./project-routes');
const clientRoutes = require('./client-routes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/clients', clientRoutes);

module.exports = router;

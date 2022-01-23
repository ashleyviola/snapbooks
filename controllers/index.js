// create router for all controller routes
const router = require('express').Router();
// routes for api to transfer JSON data
const apiRoutes = require('./api/');
// routes for viewing homepage and logging in or out
const homeRoutes = require('./home-routes.js');
// routes for viewing dashboard as logged-in user
const dashboardRoutes = require('./dashboard-routes.js');
// routes to generate PDFs
const pdfRoutes = require('./pdf-routes.js');

// assign where to use routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/generatePDF', pdfRoutes);

module.exports = router;

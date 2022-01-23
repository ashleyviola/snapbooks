// setup routes with express.js and sequelize
const router = require("express").Router();
const { Project, Client } = require("../../models");
const withAuth = require("../../utils/auth");

// get all projects
router.get("/", (req, res) => {
  // find all projects
  Project.findAll()
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one project by id
router.get("/:id", (req, res) => {
  Project.findOne({
    where: {
      // use id supplied as parameter
      id: req.params.id,
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
    ], include: {
      model: Client,
      // client information, only need company name
      attributes: ['company_name']
    }
  })
    .then((dbProjectData) => {
      // if no projects found return error message
      if (!dbProjectData) {
        res.status(404).json({ message: "No project found with this id" });
        return;
      }
      console.log(dbProjectData);
      res.json(dbProjectData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post create project
router.post("/", withAuth, (req, res) => {
  // expect
  // {
  //   "project_name": "Madmartigan Mobile App",
  //   "description": "Create a mobile app for tracking hike data.",
  //   "cost": 2375,
  //   "project_order_number": null,
  //   "status": "New",
  //   "client_id": 2
  // }
  // create project using supplied data and require authentication
  Project.create({
    project_name: req.body.project_name,
    description: req.body.description,
    cost: req.body.cost,
    project_order_number: req.body.project_order_number,
    status: req.body.status,
    client_id: req.body.client_id,
  })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

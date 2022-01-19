const router = require("express").Router();
const { Project } = require("../../models");
const withAuth = require("../../utils/auth");

// get all projects
router.get("/", (req, res) => {
  Project.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one project by id
router.get("/:id", (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id,
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
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No project found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create project
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
  Project.create({
    project_name: req.body.project_name,
    description: req.body.description,
    cost: req.body.cost,
    project_order_number: req.body.project_order_number,
    status: req.body.status,
    client_id: req.body.client_id,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

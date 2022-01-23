// setup routes with express.js and sequelize
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Client, User, Project } = require("../../models");
const withAuth = require("../../utils/auth");

// get all clients
router.get("/", (req, res) => {
    // find all clients
  Client.findAll({})
    .then((dbClientData) => res.json(dbClientData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one client by id
router.get("/:id", (req, res) => {
    // find only a single client based on given id
  Client.findOne({
    where: {
          // use id supplied as parameter

      id: req.params.id,
    },
    // client information
    attributes: [
      "id",
      "company_name",
      "address",
      "city",
      "state",
      "zip",
      "contact_first_name",
      "contact_last_name",
      "email",
      "phone_number",
      "user_id"
    ],
    include: [
      {
        model: Project,
        // project information
        attributes: [
          "id",
          "project_name",
          "description",
          "cost",
          "project_order_number",
          "status",
          "client_id"
        ],
        include: {
          model: User,
          // user information, only need username
          attributes: ["username"]
        }
      }
    ]
  })
    .then((dbUserData) => {
      // if no client found return error message
      if (!dbUserData) {
        res.status(404).json({ message: "No client found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post create client
router.post("/", withAuth, (req, res) => {
  // expects
  // {
  //   "company_name": "Dodgeball Emporium",
  //   "address": "800 Curvesta Ln.",
  //   "city": "Duckville",
  //   "state": "AZ",
  //   "zip": "85356",
  //   "contact_first_name": "Patches",
  //   "contact_last_name": "O\"Houlihan",
  //   "email": "trains-with-wrenches@mailinator.com",
  //   "phone_number": "4401239876",
  //   "user_id": 2
  // }
  // create client using supplied information
  Client.create({
    company_name: req.body.company_name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    contact_first_name: req.body.contact_first_name,
    contact_last_name: req.body.contact_last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

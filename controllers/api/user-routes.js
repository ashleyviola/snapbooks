// setup routes with express.js and sequelize
const router = require("express").Router();
const { User, Project, Client } = require("../../models");

// get all users
router.get("/", (req, res) => {
  // find all users
  User.findAll({
    // exclude passwords
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one user by id
router.get("/:id", (req, res) => {
  // find single user based on supplied parameter id
  User.findOne({
    // do not include password
    attributes: { exclude: ["password"] },
    where: {
      // user id is given in parameters
      id: req.params.id,
    },
    include: [
      {
        model: Client,
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
        include: {
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
          ]
        }
      }
    ]
  })
    .then((dbUserData) => {
      // if no matching user found with this id
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post user creation
router.post("/", (req, res) => {
  // expects {username: "patches", email: "trains-with-wrenches@mailinator.com", password: "password1234"}
  // user information to be created
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // store user details
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      // notify user of errors such as user already existing
      console.log(err);
      res.status(500).json(err);
    });
});

// post user login
router.post("/login", (req, res) => {
  // expects {"email": "saleabration03@mailinator.com", "password": "money!5mymiddl3name"}
  // find matching user to be logged in
  User.findOne({
    where: {
      email: req.body.email,
    }
  }).then((dbUserData) => {
    // if user does not exist
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // validate password
    const validPassword = dbUserData.checkPassword(req.body.password);
    // if password is invalid
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // store session details and log in user
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// user logout
router.post("/logout", (req, res) => {
  // if user is logged in, then log them out
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

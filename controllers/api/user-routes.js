const router = require("express").Router();
const {
  User,
  Group,
  Group_Users,
  Event,
  Event_Users,
} = require("../../models");
const fetch = require("node-fetch");
require("dotenv").config();

router.get("/", (req, res) => {
  User.findAll({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "group_title", "group_text", "group_zip"],
      },
      {
        model: Group,
        attributes: ["group_title"],
        through: Group_Users,
        as: "group_user",
      },
      {
        model: Event,
        attributes: ["event_title"],
        through: Event_Users,
        as: "event_user",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  })
    .then((dbUserData) => {
      const apiUrl =
        "http://api.ipstack.com/72.184.50.98?access_key=" +
        process.env.GEOAPIKEY;
      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;
              req.session.zip = data.zip;
              console.log(req.session);
              res.json(dbUserData);
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found at this username" });
        return;
      }

      const validatePassword = dbUserData.checkPassword(req.body.password);

      if (!validatePassword) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are no logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const {
  User,
  Group,
  Event,
  Group_Users,
  Event_Users,
} = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  res.render("Events-meethome");
  console.log(req.session);
});

router.get("/get-zip/:zip", (req, res) => {
  Group.findAll({
    where: {
      group_zip: req.params.zip,
    },
    attributes: [
      "id",
      "group_title",
      "group_text",
      "group_zip",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)"
        ),
        "users_count",
      ],
    ],
    include: [
      {
        model: Event,
        attributes: [
          "id",
          "event_title",
          "event_text",
          "event_location",
          "event_time",
        ],
      },
    ],
  })
    .then((dbGroupData) => {
      const groups = dbGroupData.map((group) => group.get({ plain: true }));

      res.render("Events-group-near-user", {
        groups,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/get-zip/", (req, res) => {
  console.log(req.session);
  Group.findAll({
    where: {
      group_zip: req.session.zip,
    },
    attributes: [
      "id",
      "group_title",
      "group_text",
      "group_zip",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)"
        ),
        "users_count",
      ],
    ],
    include: [
      {
        model: Event,
        attributes: [
          "id",
          "event_title",
          "event_text",
          "event_location",
          "event_time",
        ],
      },
    ],
  })
    .then((dbGroupData) => {
      const groups = dbGroupData.map((group) => group.get({ plain: true }));

      res.render("Events-group-near-user", {
        groups,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/group-home/:id", (req, res) => {
  Group.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "group_title",
      "group_text",
      "group_zip",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)"
        ),
        "users_count",
      ],
    ],
    include: [
      {
        model: Event,
        attributes: [
          "id",
          "event_title",
          "event_text",
          "event_location",
          "event_time",
        ],
      },
      {
        model: User,
        attributes: ["id", "first_name"],
        through: Group_Users,
        as: "group_user",
      },
    ],
  })
    .then((dbGroupData) => {
      const groups = dbGroupData.get({ plain: true });
      let isMember = false;
      groups.group_user.forEach((user) => {
        console.log(user);
        // the 1 will come from the session!
        if (1 === user.id) {
          isMember = true;
        }
      });
      res.render("Events-group-home", {
        groups,
        isMember,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/my-groups", (req, res) => {
  User.findOne({
    where: {
      // This will be taken from the session
      id: 1,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "group_title", "group_text", "group_zip"],
      },
      {
        model: Group,
        attributes: ["id", "group_title"],
        through: Group_Users,
        as: "group_user",
      },
      {
        model: Event,
        attributes: ["id", "event_title"],
        through: Event_Users,
        as: "event_user",
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });

      console.log(user.group_user[0].group_title);

      res.render("Events-my-groups", {
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/my-events", (req, res) => {
  User.findOne({
    where: {
      // This will be taken from the session
      id: 1,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "group_title", "group_text", "group_zip"],
      },
      {
        model: Group,
        attributes: ["id", "group_title"],
        through: Group_Users,
        as: "group_user",
      },
      {
        model: Event,
        attributes: ["id", "event_title"],
        through: Event_Users,
        as: "event_user",
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      console.log(user.event_user[0].event_title);

      res.render("Events-my-events", {
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/dashboard", (req, res) => {
  User.findOne({
    where: {
      // This will be taken from the session
      id: 1,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "group_title", "group_text", "group_zip"],
      },
      {
        model: Group,
        attributes: ["id", "group_title"],
        through: Group_Users,
        as: "group_user",
      },
      {
        model: Event,
        attributes: ["id", "event_title"],
        through: Event_Users,
        as: "event_user",
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      console.log(user.event_user[0].event_title);

      res.render("Events-my-events", {
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/dashboard/:id', (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'group_title',
            'group_text',
            'group_zip',
            [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users_count'],
            'user_id'
        ],
        include: [
            {
                model: Event,
                attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
            },
            {
                model: User,
                attributes: ['id', 'first_name'],
                through: Group_Users,
                as: 'group_user'
            }
        ]
    })
        .then(dbGroupData => {
            const group = dbGroupData.get({ plain: true })
            console.log(group)
            let isOwner = false;
            // 1 will be the req.session.user_id
            if (group.user_id === 1) {
                isOwner = true;
            }
            res.render('Events-owner-group', {
                group,
                isOwner
            });
        })
})

module.exports = router;

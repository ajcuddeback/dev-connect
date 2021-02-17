const router = require("express").Router();
const withAuth = require('../../utils/auth');
const {
    User,
    Group,
    Event,
    Group_Users,
    Event_Users,
} = require("../../models");
const sequelize = require("../../config/connection");
const fetch = require("node-fetch");
const Sequelize = require('sequelize');
require('dotenv').config()


router.get("/", withAuth, (req, res) => {
    let loggedIn = false;
    if (req.session.user_id) {
        loggedIn = true;
    }
    res.render("Events-meethome", { loggedIn });

});

router.get("/get-zip/:zip/:miles", withAuth, (req, res) => {
    const apiUrl = `https://www.zipcodeapi.com/rest/${process.env.ZIPRADIUSKEY}/radius.json/${req.params.zip}/${req.params.miles}/miles?minimal`;

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                const Op = Sequelize.Op;
                Group.findAll({
                    where: {
                        group_zip: {
                            [Op.or]: data.zip_codes
                        }
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
                        let loggedIn = false;
                        if (req.session.user_id) {
                            loggedIn = true;
                        }
                        res.render("Events-group-near-user", {
                            loggedIn,
                            groups
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            })
        }
    })

});

router.get("/get-zip/:miles", withAuth, (req, res) => {
    const apiUrl = `https://www.zipcodeapi.com/rest/${process.env.ZIPRADIUSKEY}/radius.json/${req.session.zip}/${req.params.miles}/miles?minimal`;

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                const Op = Sequelize.Op;
                Group.findAll({
                    where: {
                        group_zip: {
                            [Op.or]: data.zip_codes
                        }
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
                        let loggedIn = false;
                        if (req.session.user_id) {
                            loggedIn = true;
                        }

                        res.render("Events-group-near-user", {
                            groups,
                            loggedIn
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            })
        }
    })

});

router.get("/group-home/:id", withAuth, (req, res) => {
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
                if (req.session.user_id === user.id) {
                    isMember = true;
                }
            });
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render("Events-group-home", {
                groups,
                isMember,
                loggedIn
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/my-groups", withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
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
            let userdata = false;
            if (user.group_user.length >= 1) {
                userdata = true;
            }
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render("Events-my-groups", {
                user,
                userdata,
                loggedIn
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/my-events", withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
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
                include: {
                    model: Group,
                    attributes: ["id", "group_title", "group_text", "group_zip"]
                }
            },
        ],
    })
        .then((dbUserData) => {
            const user = dbUserData.get({ plain: true });

            console.log(user)
            let userdata = false;
            if (user.event_user.length >= 1) {
                userdata = true;
            }
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render("Events-my-events", {
                user,
                userdata,
                loggedIn
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get("/dashboard", withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
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
            }
        ],
    })
        .then((dbUserData) => {
            const user = dbUserData.get({ plain: true });
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render("Events-dashboard", {
                user,
                loggedIn
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/dashboard/:id', withAuth, (req, res) => {
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
            if (group.user_id === req.session.user_id) {
                isOwner = true;
            }
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render('Events-owner-group', {
                group,
                isOwner,
                loggedIn
            });
        })
});

router.get('/add-group', withAuth, (req, res) => {
    let loggedIn = false;
    if (req.session.user_id) {
        loggedIn = true;
    }
    res.render('Events-create-group', { loggedIn })
});

router.get('/add-event/:id', withAuth, (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'group_title',
            'user_id'
        ]
    })
        .then(dbGroupData => {
            const group = dbGroupData.get({ plain: true });
            let isOwner = false;
            // 1 will be the req.session.user_id
            if (group.user_id === req.session.user_id) {
                isOwner = true;
            }
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }
            res.render('Events-add-event', {
                group,
                isOwner,
                loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.get('/edit-event/:id', withAuth, (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'event_title',
            'event_text',
            'event_location',
            'event_time',
            [sequelize.literal('(SELECT COUNT(*) FROM event_users WHERE event.id = event_users.event_id)'), 'users_count'],
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_title', 'group_text', 'group_zip',],
                include: {
                    model: User,
                    attributes: ['id']
                }
            }
        ]
    })
        .then(dbEventData => {
            const event = dbEventData.get({ plain: true });
            let isOwner = false;
            if (event.group.user.id === req.session.user_id) {
                isOwner = true;
            };
            let loggedIn = false;
            if (req.session.user_id) {
                loggedIn = true;
            }

            res.render('Events-edit-event', {
                event,
                isOwner,
                loggedIn
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;
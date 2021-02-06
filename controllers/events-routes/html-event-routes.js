const router = require('express').Router();
const { User, Group, Event, Group_Users, Event_Users } = require('../../models');
const sequelize = require('../../config/connection')

router.get('/', (req, res) => {
    res.render('meethome')
});

router.get('/get-zip/:zip', (req, res) => {
    Group.findAll({
        where: {
            group_zip: req.params.zip
        },
        attributes: [
            'id',
            'group_title',
            'group_text',
            'group_zip',
            [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users_count'],
        ],
        include: [
            {
                model: Event,
                attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
            }
        ]
    })
        .then(dbGroupData => {
            const groups = dbGroupData.map(group => group.get({ plain: true }));

            res.render('group-near-user', {
                groups
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.get('/group-home/:id', (req, res) => {
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
        ],
        include: [
            {
                model: Event,
                attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
            }
        ]
    })
        .then(dbGroupData => {
            const groups = dbGroupData.get({ plain: true })
            res.render('group-home', {
                groups
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

module.exports = router;
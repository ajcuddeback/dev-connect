const router = require('express').Router();
const { User, Group, Event, Group_Users } = require('../../../models');
const sequelize = require('../../../config/connection')

router.get('/', (req, res) => {
    Group.findAll({
        attributes: [
            'id',
            'group_title',
            'group_text',
            'group_zip',
            [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users']
        ],
        include: [
            {
                model: Event,
                attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
            }
        ]
    })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:zip', (req, res) => {
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
            if (!dbGroupData) {
                res.status(404).json({ message: 'No Events found at this zip code!' });
                return;
            }

            res.json(dbGroupData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', (req, res) => {
    Group.create({
        group_title: req.body.group_title,
        group_text: req.body.group_text,
        group_zip: req.body.group_zip,
        user_id: req.body.user_id
    })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/add-user', (req, res) => {
    Group.addUser({ ...req.body }, { User, Group, Event, Group_Users })
        .then(updatedGroupData => res.json(updatedGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.put('/:id', (req, res) => {
    Group.update(
        {
            group_title: req.body.group_title,
            group_text: req.body.group_text,
            group_zip: req.body.group_zip
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbGroupData => {
            if (!dbGroupData) {
                res.status(404).json({ message: "No group found at this id!" });
                return;
            }

            res.json(dbGroupData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.delete('/:id', (req, res) => {
    Group.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbGroupData => {
            if (!dbGroupData) {
                res.status(404).json({ message: "No group found at this id!" });
                return;
            }

            res.json(dbGroupData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;
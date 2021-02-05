const router = require('express').Router;
const { User, Group, Event } = require('../../../models');

router.get('/', (req, res) => {
    Group.findAll({

    })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
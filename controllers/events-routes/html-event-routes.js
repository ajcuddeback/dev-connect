const router = require('express').Router();
const { User, Group, Event, Group_Users, Event_Users } = require('../../models');

router.get('/', (req, res) => {
    res.render('meethome')
});

module.exports = router;
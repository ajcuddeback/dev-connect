const router = require('express').Router();

const userRoutes = require('./user-routes');
const groupRoutes = require('./event-api-routes/group-routes');
const eventRoutes = require('./event-api-routes/event-routes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);

module.exports = router;
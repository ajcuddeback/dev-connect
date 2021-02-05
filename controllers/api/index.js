const router = require('express').Router();

const userRoutes = require('./user-routes');
const groupRoutes = require('./event-api-routes/group-routes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);

module.exports = router;
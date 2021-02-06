const router = require('express').Router();

const apiRoutes = require('./api');
const eventRouts = require('./events-routes/html-event-routes')

router.use('/api', apiRoutes);
router.use('/meet', eventRouts)

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
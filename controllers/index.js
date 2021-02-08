const router = require("express").Router();
const homeRoutes = require("./home-routes.js");

const apiRoutes = require('./api');
const eventRoutes = require('./events-routes/html-event-routes');

router.use('/api', apiRoutes);
router.use('/meet', eventRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

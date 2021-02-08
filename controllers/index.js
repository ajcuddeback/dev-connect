const router = require("express").Router();
const homeRoutes = require("./home-routes.js");

<<<<<<< HEAD
const apiRoutes = require('./api');
const eventRoutes = require('./events-routes/html-event-routes');

router.use('/api', apiRoutes);
router.use('/meet', eventRoutes);
=======
const apiRoutes = require("./api");
const eventRouts = require("./events-routes/html-event-routes");

router.use("/api", apiRoutes);
router.use("/meet", eventRouts);
router.use("/", homeRoutes);
>>>>>>> 6dcff544418e5c3478b937606852e17f88c03f86

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

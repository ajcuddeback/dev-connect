const router = require("express").Router();
const homeRoutes = require("./home-routes.js");

const apiRoutes = require("./api");
const eventRoutes = require("./events-routes/html-event-routes");
const storeRoutes = require("./store-routes/html-store-routes");

const questionRoutes = require("./question-routes/html-queston-routes");

router.use("/api", apiRoutes);
router.use("/meet", eventRoutes);
router.use("/askDevs-dashboard", questionRoutes);
router.use("/", homeRoutes);

router.use("/api", apiRoutes);
router.use("/meet", eventRoutes);
router.use("/shopping", storeRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

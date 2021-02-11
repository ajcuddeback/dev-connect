const router = require("express").Router();

const userRoutes = require("./user-routes");
const groupRoutes = require("./event-api-routes/group-routes");
const eventRoutes = require("./event-api-routes/event-routes");
const storeRoutes = require("./store-api-routes/");

//declaring variables for social routes
const socialUserRoutes = require('./social-user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
// end of social variables

router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/events", eventRoutes);
router.use("/store", storeRoutes);



//add social routes to index
router.use('/users', socialUserRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
//end of social routes to index

module.exports = router;

const router = require("express").Router();
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const tagRoutes = require("./tag-routes");
// const itemsRoutes = require("./items-routes");
// const paymentRoutes = require("./payment-routes");

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);
// router.use("/items", itemsRoutes);
// router.use("/payment", paymentRoutes);

module.exports = router;

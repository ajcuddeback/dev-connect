const router = require("express").Router();
const { Product } = require("../../models/Store_Models");

router.get("/shop", (req, res) => {
  Product.findAll({
    attributes: ["product_name", "price", "imgPath"],
  })
    .then((dbPostData) => {
      const products = dbPostData.map((product) =>
        product.get({ plain: true })
      );

      res.render("store", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/shop/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["product_name", "price", "imgPath"],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }

      // serialize the data
      const product = dbPostData.get({ plain: true });

      // pass data to template
      res.render("product-info", { product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const { Items, Product, User } = require("../../models");

router.get("/", (req, res) => {
  Product.findAll({
    attributes: ["product_name", "price", "imgPath"],

    include: [
      {
        model: Items,
        attributes: ["id", "quantity", "product_id"],
      },
    ],
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

router.get("/:id", (req, res) => {
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

// app.post('/cart', (req, res) => {
//   let qty = parseInt(req.body.qty, 10);
//   let product = parseInt(req.body.product_id, 10);
//   if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
//     Products.findOne({product_id: product}).then(prod => {
//         Cart.addToCart(prod, qty);
//         Cart.saveCart(req);
//         res.redirect('/cart');
//     }).catch(err => {
//        res.redirect('/');
//     });
// } else {
//     res.redirect('/');
// }
// });
module.exports = router;

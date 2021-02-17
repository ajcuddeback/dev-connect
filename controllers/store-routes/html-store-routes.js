const router = require("express").Router();
const { ProductTag, Product, Category, Tag } = require("../../models");
const sequelize = require("../../config/connection");
const stripeP = require("stripe")(
  "pk_test_51IJ8N2AIilHitPQW5U4lBgGOGRTR0UQja3OwPvN3BiRguzd67qgEjlrpUwS81i6SBZoPdPRiMF5s5o2K7BlPFadN002lkAwAdm"
);
const stripe = require("stripe")(
  "sk_test_51IJ8N2AIilHitPQWlppuR9Z6W9SzOpgFUrWF2u11MP8yXHygvwx7KQHKeicjtGyAll96ZbZttrnjBIkZrIF37rpb00ozyEmmdj"
);
router.get("/", (req, res) => {
  Product.findAll({
    attributes: ["product_name", "price", "imgPath"],
    order: [["product_name", "DESC"]],
  })
    .then((dbPostData) => {
      const products = dbPostData.map((product) =>
        product.get({ plain: true })
      );

      let loggedIn = false;
      if (req.session.user_id) {
        loggedIn = true;
      }
      res.render("store", { products, loggedIn, key: stripeP });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/payment-successful", (req, res) => {
  let results = "payment-successful";
  if (req.query) res.render(results);
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
      let loggedIn = false;
      if (req.session.user_id) {
        loggedIn = true;
      }
      // pass data to template
      res.render("product-info", { product, loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/create-checkout-session", async (req, res) => {
  const { quantity, amount, locale } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    locale: locale,
    line_items: [
      {
        currency: "usd",
        name: "total",
        amount: amount,
        quantity: 1,
      },
    ],

    success_url:
      "https://dev-connect-ac.herokuapp.com/shopping/payment-successful",
    cancel_url: "https://dev-connect-ac.herokuapp.com/",
  });

  res.json({ id: session.id });
});

module.exports = router;

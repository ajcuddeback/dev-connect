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

// router.post("/", (req, res) => {
//   stripeS.customers
//     .create({
//       email: req.body.email,
//       source: req.body.stripeToken,
//       name: req.body.name,
//     })
//     .then((customer) =>
//       stripeS.charges.create({
//         amount: req.body.amount,
//         currency: "usd",
//         customer: customer.id,
//       })
//     )
//     .then(() => res.render("stripe"))
//     .catch((err) => console.log(err));
// } catch (err) {
//   res.send(err);
// }
// });
// router.post("/charge", (req, res) => {
//   try {
//     stripe.customers
//       .create({
//         name: req.body.name,
//         email: req.body.email,
//         source: req.body.stripeToken,
//       })
//       .then((customer) =>
//         stripe.charges.create({
//           amount: req.body.amount * 100,
//           currency: "usd",
//           customer: customer.id,
//         })
//       )
//       .then(() => res.render("stripe"))
//       .catch((err) => console.log(err));
//   } catch (err) {
//     res.send(err);
//   }
// });
// router.get("/", (req, res) => {
//   Product.findAll({
//     attributes: ["product_name", "price", "imgPath"],
//     order: [["product_name", "DESC"]],
//     include: [
//       {
//         model: Category,
//         attributes: ["id", "category_name"],
//       },
//       {
//         model: Tag,
//         attributes: ["id", "tag_name"],
//         through: ProductTag,
//         as: "product_tags",
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       const products = dbPostData.map((product) =>
//         product.get({ plain: true })
//       );

//       let loggedIn = false;
//       if (req.session.user_id) {
//         loggedIn = true;
//       }
//       res.render("store", { products, loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
  const { quantity, price, locale } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    locale: locale,
    line_items: [
      {
        price: price,
        quantity: quantity,
      },
    ],

    success_url: "https://example.com/success.html",
    cancel_url: "https://example.com/cancel.html",
  });

  res.json({ id: session.id });
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

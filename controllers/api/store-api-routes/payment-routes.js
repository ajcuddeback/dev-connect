// const router = require("express").Router();
// const { Product, Category, Tag, ProductTag } = require("../../../models/");
// const stripeP = require("stripe")(
//   "pk_test_51IJ8N2AIilHitPQW5U4lBgGOGRTR0UQja3OwPvN3BiRguzd67qgEjlrpUwS81i6SBZoPdPRiMF5s5o2K7BlPFadN002lkAwAdm"
// );
// const stripeS = require("stripe")(
//   "sk_test_51IJ8N2AIilHitPQWlppuR9Z6W9SzOpgFUrWF2u11MP8yXHygvwx7KQHKeicjtGyAll96ZbZttrnjBIkZrIF37rpb00ozyEmmdj"
// );
// router.post("/", (req, res) => {
//   stripeS.customers
//     .create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken,
//       name: req.body.stripeName,
//     })
//     .then((customer) => {
//       return stripeS.charges
//         .create({
//           amount: 7000,
//           currency: "USD",
//           customer: customer.id,
//         })
//         .then((charge) => {
//           res.send("success");
//         })
//         .catch((err) => {
//           res.send(err);
//         });
//     });
// });
// module.exports = router;

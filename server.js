const express = require("express");
const sequelize = require("./config/connection");
const app = express();

const helpers = require('./utils/helper');

const session = require("express-session");
require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: { httpOnly: false },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3002;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});

require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it working
const express = require("express");
const app = express();
const Sauce = require("./sauces/models/sauce");
const mongoose = require("mongoose");
app.use(express.json());
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.SECRET_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(helmet());

app.use(
  "/assets/images",
  express.static(path.join(__dirname, "assets/images"))
);

const userRoutes = require("./user/controllers/user");
const sauceRoutes = require("./sauces/controllers/sauce");

console.log(path.join(__dirname, "assets/images"));
//app.use(express.static(path.join(__dirname, "assets/images")));

app.use("/api", userRoutes());
app.use("/api", sauceRoutes());

module.exports = app;

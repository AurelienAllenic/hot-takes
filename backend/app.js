const express = require("express");
const app = express();
const Sauce = require("./sauces/models/sauce");
const mongoose = require("mongoose");
app.use(express.json());
const path = require("path");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://aurel:aurel@op-v4.hfehjam.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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

const userRoutes = require("./user/controllers/user");
const sauceRoutes = require("./sauces/controllers/sauce");

console.log(path.join(__dirname, "assets/images"));
//app.use(express.static(path.join(__dirname, "assets/images")));
app.use(
  "/assets/images",
  express.static(path.join(__dirname, "assets/images"))
);

app.use("/api", userRoutes());
app.use("/api", sauceRoutes());

module.exports = app;

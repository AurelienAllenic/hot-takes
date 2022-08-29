const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");

module.exports = () => {
  router.get("/sauces", (req, res, next) => {
    console.log("Affichage de toutes les sauces");
    Sauce.find()
      .then((sauces) => {
        console.log(sauces[0]);
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
  return router;
};

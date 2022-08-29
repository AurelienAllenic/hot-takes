const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");
const fs = require("fs");

module.exports = () => {
  router.get("/sauces/:id", (req, res, next) => {
    console.log("test du getOneSauce");
    Sauce.findOne({
      _id: req.params.id,
    })
      .then((sauce) => {
        res.status(200).json(sauce);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  });
  return router;
};

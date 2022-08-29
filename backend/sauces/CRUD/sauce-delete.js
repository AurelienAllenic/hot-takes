const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");

module.exports = () => {
router.delete("/sauces/:id", (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
    });
    return router;
  };
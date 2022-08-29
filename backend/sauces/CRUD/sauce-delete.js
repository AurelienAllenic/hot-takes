const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");
const fs = require("fs");
module.exports = () => {
  router.delete("/sauces/:id", (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("assets/images/")[1];
        fs.unlink(`assets/images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée" }))
            .catch((error) => res.status(400).json({ error }));
          console.log("Sauce supprimée");
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
  return router;
};

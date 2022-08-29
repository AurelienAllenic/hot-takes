const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");
const multer = require("../middlewares/multer-config");

module.exports = () => {
  router.put("/sauces/:id", (req, res, next) => {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/../../assets/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
  return router;
};

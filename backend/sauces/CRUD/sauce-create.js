const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");

module.exports = () => {
  router.post("/sauces", (req, res, next) => {
    console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(req.auth);
    delete sauceObject._id;
    //delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/assets/images/${
        req.file.filename
      }`,
      likes: 0,
      dislikes: 0,
      usersLiked: [" "],
      usersDisliked: [" "],
    });
    sauce
      .save()
      .then(() => {
        res.status(201).json({ message: "Objet enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
  return router;
};

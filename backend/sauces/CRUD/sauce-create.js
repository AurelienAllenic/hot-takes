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
      like: 0,
      dislike: 0,
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

/* console.log("test", req.file);
    const thing = new Thing({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      imageUrl: req.file.filename,
      mainPepperIngredient: req.body.mainPepperIngredient,
      heat: req.body.heat,
    });
    thing
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post saved successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });*/

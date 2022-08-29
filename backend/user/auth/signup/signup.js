const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const router = express.Router();

module.exports = () => {
  console.log("test du login");
  router.post("/signup", (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  });
  return router;
};

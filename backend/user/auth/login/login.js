const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

module.exports = () => {
  console.log("test du login");
  router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log(user);
              res.status(401).json({
                message: "Paire identifiant/mot de passe incorrecte",
              });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    });
  });
  return router;
};

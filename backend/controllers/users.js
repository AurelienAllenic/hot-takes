const bcrypt = require("bcrypt");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

exports.login = (req, res, next) => {
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
              token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
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
};

exports.signup = (req, res, next) => {
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
};

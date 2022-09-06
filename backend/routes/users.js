const express = require("express");
const router = express.Router();
const login = require("../user/auth/login/login");
const signup = require("../user/auth/signup/signup");

module.exports = () => {
  console.log("test de l'export user passé");
  router.use("/auth", login());
  router.use("/auth", signup());
  return router;
};

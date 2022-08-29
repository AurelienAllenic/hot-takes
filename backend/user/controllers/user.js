const express = require("express");
const router = express.Router();
const login = require("../auth/login/login");
const signup = require("../auth/signup/signup");

module.exports = () => {
  console.log("test de l'export user passé");
  router.use("/auth", login());
  router.use("/auth", signup());
  /* router.post("api/auth/signup", signup.signup);
  router.post("api/auth/login", login.login);*/
  return router;
};

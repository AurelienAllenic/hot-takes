const express = require("express");
const router = express.Router();
const auth = require("../../user/auth/auth");
const create = require("../CRUD/sauce-create");
const multer = require("../middlewares/multer-config");
const displayAll = require("../CRUD/sauces-displayAll");
const displayOne = require("../CRUD/sauce-displayOne");
const modify = require("../CRUD/sauce-modify");
const deleteSauce = require("../CRUD/sauce-delete");
const like = require("../like/like");

module.exports = () => {
  router.put("/sauces/:id", auth, multer, modify());
  router.post("/sauces", auth, multer, create());
  router.get("/sauces", displayAll());
  router.get("/sauces/:id", displayOne());
  router.delete("/sauces/:id", auth, multer, deleteSauce());
  router.post("/sauces/:id/like", like());

  return router;
};

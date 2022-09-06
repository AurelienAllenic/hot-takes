const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const sauceCtrl = require("../controllers/sauces");

module.exports = () => {
  router.put("/sauces/:id", auth, multer, sauceCtrl.modify);
  router.post("/sauces", auth, multer, sauceCtrl.create);
  router.get("/sauces", auth, sauceCtrl.displayAll);
  router.get("/sauces/:id", auth, sauceCtrl.displayOne);
  router.delete("/sauces/:id", auth, multer, sauceCtrl.delete);
  router.post("/sauces/:id/like", auth, sauceCtrl.like);

  return router;
};

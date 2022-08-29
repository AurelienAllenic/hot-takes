const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");
const fs = require("fs");
//const app = express();
//const app = require(".././../app");
//app.use(express.json());
//JSON.parse(req.body);

module.exports = () => {
  router.post("/sauces/:id/like", (req, res, next) => {
    if (req.body.like == 1) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: "Sauce likée !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == 0) {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Cette sauce ne vous intéresse plus !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Cette sauce ne vous intéresse plus !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == -1) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
      )
        .then(() => res.status(200).json({ message: "Sauce dislikée !" }))
        .catch((error) => res.status(400).json({ error }));
      console.log("Sauce dislikée !");
    }
    console.log(req.body);
  });
  return router;
};

/*
//gestion des likes
module.exports = (req, res) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const likeState = req.body.like;

  switch (likeState) {
    //si like=1 on incrémente l'attribut likes de la sauce et on ajoute l'id de l'utilisateur dans le tableau usersLiked
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $inc: { likes: 1 }, $push: { usersLiked: userId } }
      )
        .then(() => res.status(200).json({ message: "Like ajouté à la sauce" }))
        .catch((error) => res.status(400).json({ error }));
      break;
    //si like=0 alors on étudie les deux tableaux usersLiked et usersDisliked et on mets à jour les attributs likes et dislikes ainsi que les tableaux eux meme selon la présence de l'userId dans l'un des deux
    case 0:
      //retourne le tableau correspondant a sauceId
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            //décrémente l'attribut likes de la sauce et supprime l'userId du tableau usersLiked
            Sauce.updateOne(
              { _id: sauceId },
              { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Vous avez enlever votre like !" })
              )
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(userId)) {
            //décrémente l'attribut dislikes de la sauce et supprime l'userId du tableau usersDisliked
            Sauce.updateOne(
              { _id: sauceId },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Vous avez enlever votre dislike !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;
    //si like=-1 on incrémente l'attribut dislikes de la sauce et on ajoute l'id de l'utilisateur dans le tableau usersDisliked
    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
      )
        .then(() =>
          res.status(200).json({ message: "dislike ajouté à la sauce" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
  }
  return router;
};
*/

/*
module.exports = () => {
  router.post("/sauces/:id/like", (req, res, next) => {
    console.log("test du like/dislike");
    let liking = document.getElementById("likes-buttons");
    let usersLiked = [];
    let userDisliked = [];
    liking.addEventListener("click", function () {
      if (like == 1) {
        usersLiked.push(userId);
      } else if (like == 0) {
        usersLiked.pop(userId);
        userDisliked.pop(userId);
      } else if (like == -1) {
        usersLiked.pop(userId);
        usersDisliked.push(userId);
      }
    });
  });
  return router;
};

  let like = document.getElementById("likes");
  let dislike = document.getElementById("dislikes");
  let usersLiked = [];
  let userDislilked = [];
  like.addEventListener("click", function () {
    if (dislikesOfUser !== 0 && likesOfUser == 0) {
      let likesOfUser = 1;
      usersLiked++;
      return usersLiked;
    } else if ((likesOfUser = 1)) {
      let likesOfUser = 0;
      return likesOfUser;
    } else if (dislikesOfUser == 1) {
      let dislikesOfUser = 0;
      let likesOfUser = 1;
      return likesOfUser && dislikesOfUser;
    }
  });
  dislike.addEventListener("click", function () {
    if (dislikesOfUser == 0 && likesOfUser == 0) {
      let dislikesOfUser = 1;
      return dislikesOfUser;
    } else if (dislikesOfUser == 0 && likesOfUser == 1) {
      let likesOfUser = 0;
      let dislikesOfUser = 1;
      return likesOfUser && dislikesOfUser;
    } else if (dislikesOfUser == 1) {
      let dislikesOfUser = 0;
      return dislikesOfUser;
    }
  });
  return router;
};
  
*/

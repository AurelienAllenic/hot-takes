const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

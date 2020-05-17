const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {

    const authHeader = req.header("Authorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }
    console.log(authHeader);
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    }).select('_id');
    if (!user) {
      req.isAuth = false;
    } else {
      req.isAuth = true;
      req.user = user;
    }
    next();
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: "Please Authenticate" });
  }
};
module.exports = auth;
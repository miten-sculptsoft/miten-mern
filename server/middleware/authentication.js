const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({ _id: verifyToken._id });
    if (!rootUser) {
      return res.status(401).json({ message: "User not found" });
    } else {
      req.rootUser = rootUser;
      next();
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = authenticate;

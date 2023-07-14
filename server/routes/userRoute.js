const express = require("express");
const user_Route = express();
const UserController = require("../controllers/userController");
const bodyParser = require("body-parser");

user_Route.use(express.json());
user_Route.use(bodyParser.json());

user_Route.post("/signup", UserController.register_user);
user_Route.post("/signin", UserController.login_user);
user_Route.post("/forgot-password", UserController.forgot_password);
user_Route.get("/reset-password/:token", UserController.reset_password_get);
user_Route.post(
  "/reset-password-post/:token",
  UserController.reset_password_post
);

module.exports = user_Route;

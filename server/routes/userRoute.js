const express = require("express");
const user_Route = express();
const UserController = require("../controllers/userController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/authentication");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

user_Route.use(cookieParser());

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
user_Route.get("/user-dashboard", auth, UserController.dashboard);
user_Route.get("/logout", auth, UserController.logout);
// user_Route.post("/add-card", auth, UserController.add_card);
user_Route.post("/payment", auth, UserController.payment);
user_Route.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  UserController.webhook
);
user_Route.get("/edit-card/:id", auth, UserController.edit_card);
user_Route.post("/update-card/:id", auth, UserController.update_card);

module.exports = user_Route;

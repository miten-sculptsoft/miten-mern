const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../config");
const eCard = require("../models/cardModel");

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "For Reset Password",
      html: `<p>Hi ${name} Please copy the link and <a href="http://localhost:3000/reset-password/${token}">Reset your password</a>, This link has been expired in 30 seconds<p/>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been Sent :", info.response);
      }
    });
  } catch (error) {
    // res.send(400).send({ success: false, msg: error.message });
    console.log(error);
  }
};

const securePassword = async (password) => {
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    return hashpassword;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const generateToken = (_id) => {
  try {
    const token = jwt.sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: "10hr",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const register_user = async (req, res) => {
  try {
    const {
      Email,
      Name,
      Birthday,
      Phone_Number,
      Gender,
      Address_line_1,
      Address_line_2,
      City,
      Password,
    } = req.body;
    if (
      (!Email || !Name || !Birthday || !Gender || !Phone_Number || !Password,
      !Address_line_1 || !Address_line_2 || !City)
    ) {
      return res.status(401).send("Plzz fill all Fields");
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res
        .status(402)
        .send({ msg: "This email is already Register Try another one" });
    } else {
      const spassword = await securePassword(Password);
      const newUser = await new User({
        Email,
        Name,
        Password: spassword,
        Birthday,
        Phone_Number,
        Gender,
        Address_line_1,
        Address_line_2,
        City,
      });
      const userData = await newUser.save();
      res.status(200).send({ data: userData });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login_user = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(401).send("Plzz fill all Fields");
    } else {
      const user_existence = await User.findOne({ Email });
      if (user_existence) {
        const password_match = await bcrypt.compare(
          Password,
          user_existence.Password
        );
        if (!password_match) {
          return res.status(402).send({ msg: "Invalid Credentials" });
        } else {
          const token = generateToken(user_existence._id);
          res.cookie("jwtoken", token, {
            maxAge: "20000000000",
          });
          res.status(200).send({ msg: "Success", data: user_existence });
        }
      } else {
        return res
          .status(401)
          .send({ message: "User does not exist Plzz Signup first" });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const forgot_password = async (req, res) => {
  try {
    const { Email } = req.body;
    if (!Email) {
      return res.status(401).send({ msg: "Please enter your email" });
    }
    const existUser = await User.findOne({ Email });
    if (existUser) {
      const token = jwt.sign({ _id: existUser._id }, process.env.SECRET_KEY, {
        expiresIn: "40s",
      });
      sendResetPasswordMail(existUser.Name, existUser.Email, token);
      const updateToken = await User.findByIdAndUpdate(
        { _id: existUser._id },
        { token: token }
      );
      res
        .status(200)
        .send({ msg: "Please Check Your inbox & Reset your Password" });
    } else {
      return res.status(402).send({ msg: "This Email Does not exists" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const reset_password_get = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenFound = await User.findOne({ token });
    if (tokenFound) {
      const validToken = jwt.verify(token, process.env.SECRET_KEY);
      if (validToken) {
        res.status(200).send("Valid User");
      }
    } else {
      res.status(401).json({ msg: "Invalid user" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const reset_password_post = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenFound = await User.findOne({ token });
    if (tokenFound) {
      const validToken = jwt.verify(token, process.env.SECRET_KEY);
      if (validToken) {
        const { Password } = req.body;
        const hashPassword = await securePassword(Password);

        const resetPassword = await User.findByIdAndUpdate(
          { _id: tokenFound._id },
          {
            $set: { Password: hashPassword, token: "" },
          }
        );
        res.status(200).send({ msg: "Password Reset Successfully" });
      }
    } else {
      return res.status(401).send({ msg: "This link has been expired " });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).json({ msg: "Logout Successfully" });
};

const add_card = async (req, res) => {
  try {
    const {
      Full_name,
      Job_title,
      Company_name,
      Bio,
      Phone_number,
      Email,
      Website,
      Address,
      About,
      Social_Media,
    } = req.body;
    const existingEmail = await eCard.findOne({ Email });
    if (existingEmail) {
      return res
        .status(401)
        .send({ err: "Email is already Exists try another one" });
    }
    const newCard = await new eCard({
      Full_name,
      Job_title,
      Company_name,
      Bio,
      Phone_number,
      Email,
      Website,
      Address,
      About,
      Social_Media,
    });
    const ecard = await newCard.save();
    res.status(200).send({ data: ecard });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const payment = async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencykey = uuid;

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of product.name`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencykey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const dashboard = async (req, res) => {
  res.send(req.rootUser);
};

module.exports = {
  register_user,
  login_user,
  forgot_password,
  reset_password_get,
  reset_password_post,
  dashboard,
  logout,
  add_card,
  payment,
};

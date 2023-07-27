const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../config");
const eCard = require("../models/cardModel");
const dotenv = require("dotenv");
const stripe = require("stripe")(
  "sk_test_51NVZ0BSBIRkMM4U482xVY8I0RIN9PfZnPkZn8s6PI5YnFvk7Y2W9N7odYuJln7inCcU9RlaCh1inA0rbTUlGuVT300E9ZK7pqV"
);
const { v4: uuidv4 } = require("uuid");

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
        console.log("Mail has been Sent :", info.res);
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

// const add_card = async (req, res) => {
//   try {
//     const {
//       Full_name,
//       Job_title,
//       Company_name,
//       Bio,
//       Phone_number,
//       Email,
//       Website,
//       Address,
//       About,
//       Social_Media,
//       newColor,
//     } = req.body;
//     const existingEmail = await eCard.findOne({ Email });
//     if (existingEmail) {
//       return res
//         .status(401)
//         .send({ err: "Email is already Exists try another one" });
//     }
//     const newCard = await new eCard({
//       Full_name,
//       Job_title,
//       Company_name,
//       Bio,
//       Phone_number,
//       Email,
//       Website,
//       Address,
//       About,
//       Social_Media,
//       newColor,
//     });
//     const ecard = await newCard.save();
//     res.status(200).send({ data: ecard });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

//Payment Intent

const payment = async (req, res) => {
  const eCardDetail = req.body.parsevalue;

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      eCard: JSON.stringify(eCardDetail),
    },
  });
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: eCardDetail.Full_name,
              description: eCardDetail.Job_title,
            },
            unit_amount: 1000 * 3.5,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.CLIENT_URl}/payment-success`,
      cancel_url: `${process.env.CLIENT_URl}/billing`,
    });
    // console.log(success_url);
    res.send({ url: session.url, payment: session.payment_status });
  } catch (error) {
    console.log(error.message);
  }
};

// Create order

const createOrder = async (customer) => {
  const Items = JSON.parse(customer.metadata.eCard);

  const newOrder = new eCard({
    Full_name: Items.Full_name,
    Job_title: Items.Job_title,
    Company_name: Items.Company_name,
    Bio: Items.Bio,
    Phone_number: Items.Phone_number,
    Email: Items.Email,
    Website: Items.Website,
    Address: Items.Address,
    About: Items.About,
    Social_Media: Items.Social_Media,
    newColor: Items.newColor,
  });

  try {
    const saveOrder = await newOrder.save();
    console.log("Processes Order", saveOrder);
  } catch (error) {
    console.log(error.message);
  }
};

// Stripe Webhook

let endpointSecret;

// endpointSecret =
//   "";

const webhook = (req, res) => {
  console.log("hiii");
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.log(`Webhook error':${err.message}`);
      res.status(402).send(`Webhook Error: ${err.message}`);
      return;
    }
    (data = event.data.object), (eventType = event.type);
  } else {
    (data = req.body.data.object), (eventType = req.body.type);
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        // console.log(customer), console.log("DATA", data);
        createOrder(customer, data);
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
};

const Nav_dashboard = async (req, res) => {
  const geteCard = await User.find();
  if (!geteCard) {
    return res.status(404).send({ msg: "No card Found" });
  } else {
    res.status(200).send({ data: geteCard });
  }
};

const user_eCard = async (req, res) => {
  const geteCard = await eCard.find();
  if (!geteCard) {
    return res.status(404).send({ msg: "No card Found" });
  } else {
    res.status(200).send({ data: geteCard });
  }
};

const edit_card = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await eCard.findById(id);
    if (card) {
      res.status(200).send({ data: card });
    } else {
      res.status(404).send({ msg: "No card Found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_card = async (req, res) => {
  try {
    const { id } = req.params;
    const cardUpdate = await eCard.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ cardUpdate });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const one_user = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await eCard.findOne({ _id });
    if (user) {
      res.status(200).send({ data: user });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

module.exports = {
  register_user,
  login_user,
  forgot_password,
  reset_password_get,
  reset_password_post,
  Nav_dashboard,
  logout,
  payment,
  webhook,
  edit_card,
  update_card,
  user_eCard,
  one_user,
};

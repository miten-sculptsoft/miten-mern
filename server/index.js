const express = require("express");
const app = express();
const dotenv = require("dotenv");
const user_Route = require("./routes/userRoute");
require("./dbConnect");

PORT = process.env.PORT || 7000;

app.use("/", user_Route);

app.listen(PORT, () => {
  console.log(`Server Started on Port no new ${PORT}`);
});

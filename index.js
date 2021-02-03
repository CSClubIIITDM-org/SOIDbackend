const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

//IMPORT ROUTES

const authRoute = require("./routes/auth/authorisation");
const commonRoute = require("./routes/common/commonRoutes");
const adminDashboardRoute = require("./routes/admin/dashboard");

dotenv.config();

//CONNECTION TO DATABASE
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  () => console.log("connected to db  ")
);

//MIDDLEWARE

app.use(express.json(), cors());

//ROUTE MIDDLEWARE

app.use("/api/auth", authRoute);
app.use("/api/common", commonRoute);
app.use("/api/admin/dashboard", adminDashboardRoute);

app.get("/", (req, res) => {
  res.send(`<p>Project SIDI backend</p>`);
});

app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));

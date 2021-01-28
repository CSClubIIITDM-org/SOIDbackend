const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../admin/verify");

//VALIDATION OF USER INPUTS PREREQUISITES

const Joi = require("@hapi/joi");
const User = require("../../models/User");

//REGISTER USER

const registerSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  type: Joi.string().required(),
});

router.post("/register", verify, async (req, res) => {
  //CHECK IF IT'S ADMIN
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access create users" });

    return;
  }
  //CHECKING IF USER EMAIL ALREADY EXISTS

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(200).send({ status: "400", message: "Email already exists" });
    return;
  }

  //HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //SET TOKEN

  const token = jwt.sign(
    { email: req.body.email, type: req.body.type },
    process.env.TOKEN_SECRET
  );

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    type: req.body.type,
    token: token,
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res
        .status(200)
        .send({ status: "400", message: error.details[0].message });
      return;
    } else {
      //NEW USER IS ADDED
      const saveUser = await user.save();
      res.status(200).send({ status: "200", message: "User Created" });
    }
  } catch (error) {
    res.status(200).send({ status: "500", message: error });
  }
});

//LOGIN USER

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

router.post("/login", async (req, res) => {
  //CHECKING IF USER EMAIL EXISTS

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(200).send({ status: "400", message: "Incorrect email-id" });
    return;
  }

  //CHECKING IF USER PASSWORD MATCHES
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    res.status(200).send({ status: "400", message: "Invalid Password" });
    return;
  }

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) {
      res
        .status(200)
        .send({ status: "400", message: error.details[0].message });

      return;
    }

    res
      .status(200)
      .header("auth-token", user.token)
      .send({ status: "200", message: { token: user.token, type: user.type } });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

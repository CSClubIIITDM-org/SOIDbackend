const jwt = require("jsonwebtoken");

const verify = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(200).send({ status: "401", message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(200).send({ status: "401", message: "Invalid Token" });
  }
};

module.exports = verify;

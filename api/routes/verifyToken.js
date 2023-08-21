const jwt = require("jsonwebtoken");
const BlackListTokens = require("../models/BlackListTokens");

async function loginRequired(req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Invalid Access Token");

  try {
    // CHECK IF TOKEN IS BLACKLISTED
    const foundToken = await BlackListTokens.findOne({
      token: token,
    });

    if (foundToken)
      return res.status(401).send("Token blacklisted, please login again");

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = loginRequired;

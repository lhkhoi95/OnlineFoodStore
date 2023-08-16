const jwt = require("jsonwebtoken");

function getUserId(header) {
  const token = header;
  // DECRYPT userId
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  getUserId,
};

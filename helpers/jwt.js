const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_TOKEN);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_TOKEN);
}

module.exports = {
  generateToken,
  verifyToken,
};

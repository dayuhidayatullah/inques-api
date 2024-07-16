const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_TOKEN);
}

function verifyToken(token) {
  console.info(token.split(' ')[1], '><<<<< token')
  return jwt.verify(token.split(' ')[1], process.env.SECRET_TOKEN);
}

module.exports = {
  generateToken,
  verifyToken,
};

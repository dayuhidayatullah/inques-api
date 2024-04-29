const bcrypt = require("bcryptjs");

async function hashPassword(payload) {
  const salt = await bcrypt.genSalt(4, 10);
  const hash = await bcrypt.hash(payload, salt);

  return hash;
}

async function comparePassword(password, hashPassword) {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
}
// $2y$10$BEfQhNaMpAP22KT3wloXduE7CirSaJW47 / QmVBZgALW758PcKMR3G;
module.exports = {
  hashPassword,
  comparePassword,
};

const jwt = require("jsonwebtoken");

const tokenGenerator = {
  sign: (userId) => {
    return jwt.sign({ userId }, `${process.env.TOKEN_KEY}`);
  },
  verify: (token) => {
    return jwt.verify(token, `${process.env.TOKEN_KEY}`);
  }
}

module.exports = tokenGenerator;
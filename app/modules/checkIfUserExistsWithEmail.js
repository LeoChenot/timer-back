const { User } = require("../models");

const checkIfUserExistsWithEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    }
  });
}

module.exports = checkIfUserExistsWithEmail;
const { User } = require("../models");

const checkIfUserExist = {
  withEmail: async (email) => {
    return await User.findOne({
      where: {
        email: email,
      }
    });
  },
  
  withId: async (id) => {
    return await User.findByPk(id);
  }
}

module.exports = checkIfUserExist;
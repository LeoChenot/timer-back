const bcrypt = require("bcrypt");

const passwordEncryptor = {
  encryptor: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  compare: async (password, userEncryptedPassword) => {
    return await bcrypt.compare(password, userEncryptedPassword);
  }
}

module.exports = passwordEncryptor;
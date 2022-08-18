const { User } = require("../models");
const checkIfUserExistsWithEmail = require("../modules/checkIfUserExistsWithEmail");
const passwordEncryptor = require("../modules/passwordEncryptor");
const tokenGenerator = require("../modules/tokenGenerator");

const authController = {
  login: async (req, res, next) => {
    console.log('login');
    try {
      const foundUser = await checkIfUserExistsWithEmail(req.body.email);
      if (foundUser) {
        const passwordValidation = await passwordEncryptor.compare(req.body.password, foundUser.password);
        if (passwordValidation) {
          res.json(
            {
              user: {
                id: foundUser.id,
                email: foundUser.email,
                created_at: foundUser.created_at,
                updated_at: foundUser.updated_at,
              },
              token: tokenGenerator.sign(foundUser.id),
            }
          );
        }
        else {
          res.status(403).send({
            message: "This password is incorrect",
          });
        }
      }
      else {
        res.status(403).send({
          message: "This email address is unknown",
        });
      }
    } catch (error) {
      res.send(error);
    }
  },

  check: async (req, res, next) => {
    console.log('check');
    try {
      const response = tokenGenerator.verify(req.body.token);
      const foundUser = await User.findOne({
        where: {
          id: response.userId,
        }
      });
      res.json(
        {
          user: {
            id: foundUser.id,
            email: foundUser.email,
            created_at: foundUser.created_at,
            updated_at: foundUser.updated_at,
          },
          token: tokenGenerator.sign(foundUser.id),
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (req, res, next) => {
    console.log('logout');
  },
};

module.exports = authController;
const { User } = require("../models");
const checkIfUserExist = require("../modules/checkIfUserExists");
const passwordEncryptor = require("../modules/passwordEncryptor");
const tokenGenerator = require("../modules/tokenGenerator");

const authController = {
  login: async (req, res, next) => {
    console.log('login');
    try {
      const foundUser = await checkIfUserExist.withEmail(req.body.email);
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
    console.log('authController.check');
    try {
      const foundUser = await checkIfUserExist.withId(res.locals.userId);
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
      res.send(error);
    }
  },

  logout: async (req, res, next) => {
    console.log('logout');
  },
};

module.exports = authController;
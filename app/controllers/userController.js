const { User } = require("../models");
const checkIfUserExist = require("../modules/checkIfUserExists");
const passwordEncryptor = require("../modules/passwordEncryptor");
const tokenGenerator = require("../modules/tokenGenerator");

const userController = {
  create: async (req, res, next) => {
    console.log('create');
    try {
      const foundUser = await checkIfUserExist.withEmail(req.body.email);
      const encryptedPassword = await passwordEncryptor.encryptor(req.body.password);
      if (foundUser) {
        res.send("This email is already registered");
      }
      else {
        await User.create({
          email: req.body.email,
          password: encryptedPassword,
        });
        res.send("The account has been created");
      }
    } catch (error) {
      res.send(error);
      // res.send(error.errors[0].message);
    }
  },

  read: async (req, res, next) => {
    console.log('read');
    try {
      const foundUser = await User.findByPk(res.locals.userId);

      res.json(
        {
          user: {
            id: foundUser.id,
            email: foundUser.email,
            created_at: foundUser.created_at,
            updated_at: foundUser.updated_at,
          },
        }
      );
    } catch (error) {
      res.send(error);
    }
  },

  update: async (req, res, next) => {
    console.log('update');
    try {
      const foundUser = await checkIfUserExist.withEmail(req.body.email);
      const encryptedPassword = await passwordEncryptor.encryptor(req.body.password);
      if (foundUser) {
        res.send("This email is already registered");
      }
      else {
        await User.update(
          {
            email: req.body.email,
            password: encryptedPassword,
          },
          {
            where: {
              id: req.body.id,
            },
          },
        );
        res.send("This account has been updated");
      }
    } catch (error) {
      res.send(error);
    }
  },

  delete: async (req, res, next) => {
    console.log('delete');
    try {
      const userRemoved = await User.destroy({
        where: {
          id: req.body.id,
        }
      });
      if (userRemoved === 0) {
        res.send("This user doesn't exist");
      }
      else if (userRemoved === 1) {
        res.send("This user has been deleted");
      }
      else {
        console.log(userRemoved);
      }
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = userController;

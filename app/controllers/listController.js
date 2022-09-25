const { List, Timer } = require("../models");

const listController = {
  async create(req, res, next) {
    console.log('create');
    try {
      const { name } = req.body;
      const newList = await List.create({
        name: name,
        user_id: res.locals.userId,
      });
      res.send(newList);
    } catch (error) {
      console.log(error);
    }
  },

  async read(req, res, next) {
    console.log('read');
    try {
      const listList = await List.findAll({
        where: {
          user_id: res.locals.userId,
        },
        include: {
          model: Timer,
        }
      });
      res.send(listList);
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res, next) {
    console.log('update');
  },

  async delete(req, res, next) {
    console.log('delete');
  },
};

module.exports = listController;
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
      res.send(error);
    }
  },

  async readAll(req, res, next) {
    console.log('read');
    try {
      const listList = await List.findAll({
        where: {
          user_id: res.locals.userId,
        },
        include: [{
          model: Timer,
          as: "timers",
        }],
        order: [
          ['id', 'ASC'],
          ['timers', 'id', 'ASC']
        ],
      });
      res.send(listList);
    } catch (error) {
      res.send(error);
    }
  },

  async update(req, res, next) {
    console.log('update');
  },

  async delete(req, res, next) {
    console.log('delete');
    try {
      const listId = Number(req.params.listId);
      const listDeleted = await List.destroy({
        where: {
          id: listId,
        }
      });
      res.send({
        message: "The list has been deleted",
      });
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = listController;
const Timer = require("../models/Timer");

const timerController = {
  async create(req, res) {
    console.log('create');
    try {
      const { name, delay, listId } = req.body;
      const newTimer = await Timer.create({
        name: name,
        delay: delay,
        list_id: listId,
      });
      res.send({
        message: "This timer has been created",
      });
    } catch (error) {
      res.send(error);
    }
  },

  async read(req, res, next) {
    console.log('read');
    try {
      const timerList = await Timer.findAll({
        where: {
          user_id: res.locals.userId,
        },
        order: [
          ['id', 'ASC'],
        ]
      });
      if (timerList) {
        return res.json(timerList);
      }
      next();
    } catch (error) {
      res.send(error);
    }
  },

  async update(req, res) {
    console.log('update');
    const { name, delay, listId } = req.body;
    const timerId = Number(req.params.timerId);
    try {
      const timerUpdated = await Timer.update({
        name: name,
        delay: delay,
        list_id: listId,
      },{
        where: {
          id: timerId,
        }
      });
      res.send({
        message: "This timer has been updated",
      });
    } catch (error) {
      res.send(error);
    }
  },

  async delete(req, res, next) {
    const timerId = Number(req.params.timerId);
    try {
      const timerRemoved = await Timer.destroy({
        where: {
          id: timerId,
        }
      });
      if (timerRemoved === 0) {
        res.send({
          message: "This timer doesn't exist",
        });
      }
      else if (timerRemoved === 1) {
        res.send({
          message: "This timer has been deleted",
        });
      }
      else {
        console.log(timerRemoved);
      }
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = timerController;
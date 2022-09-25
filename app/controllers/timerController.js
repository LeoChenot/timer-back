const Timer = require("../models/timer");

const timerController = {
  async create(req, res) {
    console.log('create');
    try {
      const { name, delay, listId } = req.body;
      const newTimer = await Timer.create({
        name: name,
        delay: delay,
        user_id: res.locals.userId,
        list_id: listId,
      });
      res.json(newTimer);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },

  async read(req, res, next) {
    console.log('read');
    try {
      const timerList = await Timer.findAll({
        where: {
          user_id: res.locals.userId,
        }
      });
      if (timerList) {
        return res.json(timerList);
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res) {
    res.send('update');
  },

  async delete(req, res, next) {
    const id = Number(req.params.id);
    try {
      const timerRemoved = await Timer.destroy({
        where: {
          id: id,
        }
      });
      if (timerRemoved === 0) {
        res.send("This timer doesn't exist");
      }
      else if (timerRemoved === 1) {
        res.send('This timer has been deleted ');
      }
      else {
        console.log(timerRemoved);
      }
    } catch (error) {
      next(error)
    }
    console.log(id);
  },
};

module.exports = timerController;
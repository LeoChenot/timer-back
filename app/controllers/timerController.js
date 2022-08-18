const Timer = require("../models/timer");

const timerController = {
  async create(req, res) {
    console.log('create');
    try {
      console.log(req.body);
      const newTimer = await Timer.create(req.body);
      res.json(newTimer);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },

  async read(req, res, next) {
    console.log('read');
    try {
      const timerList = await Timer.findAll();
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

  async delete(req, res) {
    res.send('delete');
  },
};

module.exports = timerController;
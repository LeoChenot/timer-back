const listController = {
  async create(req, res, next) {
    console.log('create');
  },

  async read(req, res, next) {
    console.log('read');
  },

  async update(req, res, next) {
    console.log('update');
  },

  async delete(req, res, next) {
    console.log('delete');
  },
};

module.exports = listController;
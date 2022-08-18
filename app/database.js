const { Sequelize } = require("sequelize");

const client = new Sequelize(process.env.PG_URL, {
  define: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
});

module.exports = client;
const { Sequelize } = require("sequelize");

const client = new Sequelize(process.env.DATABASE_URL, {
  define: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
});

module.exports = client;
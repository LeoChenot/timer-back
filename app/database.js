const { Sequelize } = require("sequelize");

const client = new Sequelize(process.env.DATABASE_URL, {
  define: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }
});

const connect = async () => {
  try {
    await client.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();

module.exports = client;
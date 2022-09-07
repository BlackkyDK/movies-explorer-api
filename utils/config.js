require('dotenv').config();

const {
  PORT = 3000,
  MONGO_DB = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV = 'dev',
} = process.env;

module.exports = {
  PORT,
  MONGO_DB,
  NODE_ENV,
};

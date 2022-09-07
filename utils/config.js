require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_CONNECT = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV = 'dev',
} = process.env;

module.exports = {
  PORT,
  MONGODB_CONNECT,
  NODE_ENV,
};

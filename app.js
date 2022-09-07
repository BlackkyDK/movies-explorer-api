require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');

const app = express();
const { PORT = 3000 } = process.env;

const limiter = require('./middlewares/limiter');

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'https://klementeva.nomoredomains.sbs',
    'http://klementeva.nomoredomains.sbs',
    'https://api.klementeva.nomoredomains.sbs',
    'http://api.klementeva.nomoredomains.sbs',
    'http://localhost:3000',
    'https://locahost:3000',
    'http://localhost:3001',
    'https://locahost:3001',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});

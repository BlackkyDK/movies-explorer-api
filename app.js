require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const { validateUserCreate, validateUserLogin } = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const { PORT = 3000 } = process.env;

const { createUser, login } = require('./controllers/users');

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
app.post('/signup', validateUserCreate, createUser);
app.post('/signin', validateUserLogin, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});

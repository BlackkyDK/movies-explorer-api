const router = require('express').Router();
const routerMovies = require('./movies');
const routerUsers = require('./users');

const { validateUserCreate, validateUserLogin } = require('../middlewares/celebrate');

const auth = require('../middlewares/auth');

const NotFound = require('../errors/NotFound');

const { createUser, login } = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserLogin, login);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;

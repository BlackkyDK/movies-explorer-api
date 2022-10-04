const router = require('express').Router();
const { validateMovieCreate } = require('../middlewares/celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovieCreate, createMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;

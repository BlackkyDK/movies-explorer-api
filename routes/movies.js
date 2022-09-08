const router = require('express').Router();
const { validateMovieCreate, validateMovieDelete } = require('../middlewares/celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovieCreate, createMovie);

router.delete('/:movieId', validateMovieDelete, deleteMovie);

module.exports = router;

const router = require('express').Router();

const { validateUser, validateUserUpdate } = require('../middlewares/celebrate');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/me', validateUser, getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;

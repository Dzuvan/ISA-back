const express = require('express');

const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.get('/', UserController.users_get_all);

router.get('/:userId', UserController.users_get_one);

router.patch('/:userId', checkAuth, UserController.users_update_one);

module.exports = router;

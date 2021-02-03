const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { auth } = require('../utils/auth');

router.route('/').post(userController.create);

module.exports = router;

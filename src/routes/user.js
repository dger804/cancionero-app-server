const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { auth } = require('../utils/auth');

router.route('/').post(userController.create);
router.route('/').get(userController.list);
router.route('/:usersId').get(auth, userController.show);

module.exports = router;

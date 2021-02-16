const router = require('express').Router();
const folderController = require('../controllers/folder.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, folderController.create);
router.route('/').get(folderController.list);

module.exports = router;
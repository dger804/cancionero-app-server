const router = require('express').Router();
const songController = require('../controllers/song.controller');
const { auth } = require('../utils/auth');

router.route('/').post(songController.create);
router.route('/').get(songController.list);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts')
const {authenticateToken} = require('../middleware')

router.get('/', controller.fetch);
router.post('/', controller.create);
// router.get('/me',[authenticateToken],controller.get_user);


module.exports = router;
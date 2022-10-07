const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth')
const {authenticateToken} = require('../middleware')

router.post('/sign_up', controller.sign_up);
router.post('/sign_in', controller.login);
router.get('/me',[authenticateToken],controller.get_user);


module.exports = router;
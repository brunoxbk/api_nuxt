const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth')

router.post('/sign_up', controller.sign_up);
router.post('/sign_in', controller.login);


module.exports = router;
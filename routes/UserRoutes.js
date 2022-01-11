const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/usercontroller');

router.post('/register', userController.create);

router.post('/authenticate', userController.autheticate);

module.exports = router;
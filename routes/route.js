const express = require('express');
const router = express.Router();
const controller = require('../controller/jwt/account');

router.get('/getName', controller.get);

module.exports = router
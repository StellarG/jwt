const express = require('express');
const router = express.Router()
const controller = require('../controller/jwt/account')


router.get('/getName',controller.get)
router.get('/getAddress', controller.get)

module.exports = router
const express = require('express');
const router = express.Router()
const controller = require('../controller/index')


router.get('/getName',controller.jwt.get)
router.get('/getAccountById/:id',controller.jwt.getById)
router.put('/updateAccount/:id',controller.jwt.update)
router.post('/createAccount',controller.jwt.post)
router.delete('/deleteAccount/:id',controller.jwt.delete)

module.exports = router
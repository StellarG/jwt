const express = require('express');
const router = express.Router()
const controller = require('../controller/index')
const auth = require('../config/security/authenticate')


router.get('/getName',auth(1),controller.account.get)
router.get('/getAccountById/:id',controller.account.getById)
router.put('/updateAccount/:id',auth(2),controller.account.update)
router.post('/createAccount',controller.account.post)
router.delete('/deleteAccount/:id',auth(1),controller.account.delete)

//user
router.post('/register/user',controller.user.postUser)
router.post('/register/admin',controller.user.postAdmin)
router.put('/user/delete/:id',auth(1),controller.user.softDelete)
router.delete('/user/hardDelete',auth(1),controller.user.delete)

router.post('/login',controller.auth.login)
router.post('/verifOTP',controller.auth.verifyOtp)
router.post('/requestOTP',controller.auth.requestOTP)

module.exports = router
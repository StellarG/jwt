const account = require('./jwt/account')
const user = require('../controller/jwt/user')
const auth = require('../controller/jwt/auth')
const controller = {}

controller['account'] = account
controller['user'] = user
controller['auth'] = auth

module.exports = controller

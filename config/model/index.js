const model = {}
const account = require('../model/account/account')
const user = require('../model/user/user')
const otp = require('../model/user/otp')

model.account = account.account
model.user = user.user
model.otp = otp.otp

module.exports = model
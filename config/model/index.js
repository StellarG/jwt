const model = {}
const account = require('../model/account/account')
const user = require('../model/user/user')

model.account = account.account
model.user = user.user

module.exports = model
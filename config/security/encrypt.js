const bcrypt = require('bcryptjs')
const enc = {}

enc.hashPassword = async (password) => {
    try {
        const garem = await bcrypt.genSalt(10)
        const rs = await bcrypt.hash(password, garem)

        return rs
    } catch (err) {
        throw err['message']
    }
}

module.exports = enc

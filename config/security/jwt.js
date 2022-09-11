const jwt = require('jsonwebtoken')
const token = {}

token.generate = async (payload) =>{
    try {
        const data = {
            username: payload.username,
            roles: payload.role_id,
        }
        const token = jwt.sign(data, process.env.JWT_KEYS, {expiresIn: "1d" })
        // console.log(token)
        const result = {
            message: "Token Created",
            token: token
        }
        return result
    } catch (error) {
        throw error // melempar ke function yang memanggil
    }
}

module.exports = token
const jwt = require('jsonwebtoken')

function authenticates (roles) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if(token == null){res.status(401).json('Silahkan Login Terlebih Dahulu!')}
    
        jwt.verify(token, process.env.JWT_KEYS, (err, user) =>{
            if(err){return res.status(403).json(err['message'])}
            if(user.roles === roles){next()}
            else{res.status(403).json('access denied')}
        })
    }
}

module.exports = authenticates
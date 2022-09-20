const crypt = require('crypto')
const generate = {}

generate.randomString = async () =>{
    let key = crypt.randomBytes(32).toString('hex')

    return key 
}

generate.generateOtp = async () =>{
    let stringKey = await generate.randomString()
    let otp = ""

    var len = stringKey.length
    for(var i = 0; i < 4; i++){
        otp += stringKey[Math.floor(Math.random() * len)]
    }

    console.log('otp',otp);

    return otp
}

module.exports = generate
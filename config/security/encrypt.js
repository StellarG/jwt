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

// loginMethod.login = async (req, res) => {
//     try {
//       const passDB = await usersModel.getEmail(req.body.email);
//       const passUser = req.body.password;
//       const check = await bcrypt.compare(passUser, passDB[0].password);
//       if (check) {
//         const result = await tokenAuth(req.body.email);
//         return response(res, 200, result);
//       }
//     } catch (error) {
//       response(res, 500, { msg: 'wrong password or email' });
//     }
//   };
  
// async function hashPassword(password) {
//     try {
//         const salt = await bcr.genSalt(10) //random char from a-z sebanyak parameter (misal : 10), kemudian digabung dengan password kita nanti. Salt menyembunyikan bentuk asli dari password 
//         const result = await bcr.hash(password, salt)
//         return result
//     } catch (error) {
//         throw error
//     }
// }

// module.exports = hashPassword



// const password = 'pass123';
// var hashedPassword;
  
// // Encryption of the string password
// bcrypt.genSalt(10, function (err, Salt) {
  
//     // The bcrypt is used for encrypting password.
//     bcrypt.hash(password, Salt, function (err, hash) {
  
//         if (err) {
//             return console.log('Cannot encrypt');
//         }
  
//         hashedPassword = hash;
//         console.log(hash);
  
//         bcrypt.compare(password, hashedPassword, 
//             async function (err, isMatch) {
  
//             // Comparing the original password to
//             // encrypted password   
//             if (isMatch) {
//                 console.log('Encrypted password is: ', password);
//                 console.log('Decrypted password is: ', hashedPassword);
//             }
//             if (!isMatch) {
              
//                 // If password doesn't match the following
//                 // message will be sent
//                 console.log(hashedPassword + ' is not encryption of ' 
//                 + password);
//             }
//         })
//     })
// })   



// const auth = {}
// const model = require("../models/users")
// const bcr = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const response = require("../helpers/response")
// const Logger = require("../helpers/logger")

// const token = async (email) => {
//     try {
//         const payload = {
//             user: email,
//             roles: 'customer',
//         }
//         const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: "1d" })
//         // console.log(token)
//         const result = {
//             message: "Token Created, Login Success",
//             token: token,
//             email,
//         }
//         return result
//     } catch (error) {
//         throw error // melempar ke function yang memanggil
//     }
// }

// auth.login = async (req, res) => {
//     try {
//         const passDB = await model.getUserByEmail(req.body.email)
//         const passUsers = req.body.password

//         if (passDB.length <= 0) {
//             return response(res, 200, { msg: "Email Not Registered" })
//         }

//         const check = await bcr.compare(passUsers, passDB[0].password)
//         // console.log(passDB)
//         if (check) {
//             const result = await token(req.body.email)
//             return response(res, 200, result)
//         } else {
//             return response(res, 401, { msg: "Login Failed!" })
//         }
//     } catch (error) {
//         Logger.error(error)
//         return response(res, 500, error, true)
//     }
// }
// // console.log(auth)
// module.exports = auth
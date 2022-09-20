const mailer = require('nodemailer')
const otp = require('../middlewares/otpGenerator')
// const bcrypt = require('bcryptjs')
const enc = require('../config/security/encrypt')
const mail = {}

mail.sendEmail = async (email, getOtp) =>{
    try {
        let transport = mailer.createTransport({
            host : 'smtp.office365.com',
            port : 587,
            secure : false,
            auth : {
                type : 'LOGIN',
                user : process.env.AUTH_EMAIL,
                pass : process.env.AUTH_PASS
            }
        })
    
        //test connection
        transport.verify((err, success) =>{
            if(err){
                console.log(err);
            }else{
                console.log('Ready');
                console.log(success);
            }
        })

        let data = {
            from : process.env.AUTH_EMAIL,
            to : email,
            subject : "Verify your email",
            html : `<p>Enter this ${getOtp} to the application</p>`
        }

        let send = transport.sendMail(data)

        return send
    } catch (error) {
        throw error['message']
    }
}

module.exports = mail